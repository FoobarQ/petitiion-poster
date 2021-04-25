import "reflect-metadata";
import { createConnection } from "typeorm";
import { Petition } from "./entity/Petition";
import fetch from "node-fetch";

const Twitter = require("twitter-lite");
const petitionUrl = process.env.PETITION_URL;

const client = new Twitter({
    subdomain: "api",
    version: "1.1",
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const TWEET_LIMIT = process.env.TWEET_LIMIT ? parseInt(process.env.TWEET_LIMIT) : 2;
createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
        ssl: {
            "rejectUnauthorized": false
        }
    },
    entities: [
        __dirname + "/entity/*"
    ],
    synchronize: true
}).then(async connection => {
    let tweetsMade = 0;
    let page = 1;

    while (tweetsMade < TWEET_LIMIT) {

        console.log("Retrieving petitions...");

        let petitions: PetitionInterface[];
        petitions = await getPetitions(page);
        if (!petitions) {
            console.log("page limit reached.");
            return;
        }

        console.log("  Success.");
        console.log("Processing petitions...");

        for (const petition of petitions) {
            let entity;
            try {
                entity = await connection.manager.findOne(Petition, {
                    where: {
                        id: `${petition.id}`
                    }
                });
            } catch (notFoundError) {
                console.log("NEW PETITION: " + petition.attributes.action);
            }


            if (entity === undefined) {
                console.log("Making tweet...");
                await composeTweet(petition)
                    .then(tweet => postTweet(tweet)).then(
                        id => {
                            console.log("  Success.");
                            console.log("Updating database...");
                            const petitionEntry = new Petition();
                            petitionEntry.deadline = new Date(petition.attributes.opened_at.setMonth(petition.attributes.opened_at.getMonth() + 6));
                            petitionEntry.tweetId = String(id);
                            petitionEntry.id = String(petition.id);
                            petitionEntry.signature_count = petition.attributes.signature_count;
                            return connection.manager.save(petitionEntry);
                        }
                    ).then(
                        (data) => {
                            console.log("  Success.");
                            console.log(`Saved a new petition with id: ${data.id}\n\n`);
                            tweetsMade++;
                        }
                    );

                if (tweetsMade >= TWEET_LIMIT) {
                    console.log("Process finished successfully.")
                    return;
                }
            }
        }

        page++;
    }

    console.log("No new petitions to post.")
}).catch(error => console.log(error));


async function composeTweet(petition: PetitionInterface) {
    const { links } = petition;
    const {
        action,
        opened_at,
        response_threshold_reached_at,
        government_response_at,
        debate_threshold_reached_at,
        debate_outcome_at,
        scheduled_debate_date,
        topics,
    } = petition.attributes;
    const deadline = new Date(opened_at.setMonth(opened_at.getMonth() + 6));
    let status = "";
    if (response_threshold_reached_at) {
        status += government_response_at
            ? "Response recieved"
            : "Awaiting response";
    }
    if (debate_threshold_reached_at) {
        if (debate_outcome_at) {
            status +=
                " & " + (new Date().getTime() < debate_outcome_at.getTime())
                    ? ", awaiting debate outcome"
                    : ", recieved debate outcome";
        } else {
            if (
                scheduled_debate_date &&
                new Date().getTime() < scheduled_debate_date.getTime()
            ) {
                status += ", awaiting debate";
            }
            status += ", debate date not set";
        }
    }
    let tweet = `Petition: ${action}`;
    tweet += `\n\n${status}.`;
    tweet += `\nDeadline: ${deadline.toLocaleDateString('en-GB', { timeZone: 'UTC' })}`;
    tweet += `\n${topics ? topics.map((element) => hashtagify(element)) : ""
        }#UKPetition #UK #UnitedKingdom`;
    tweet += `\n${links.self.replace(".json", "")}`;
    return tweet;
}

async function postTweet(tweet: string): Promise<number> {
    let tweetConfirmation;
    await client
        .get("account/verify_credentials")
        .then(client.post("statuses/update", { status: tweet }))
        .then((data) => {
            tweetConfirmation = data;
        })
        .catch((error) => console.error(error));
    return tweetConfirmation.id;
}

async function getPetitions(pageNumber: number = 0): Promise<PetitionInterface[] | null> {
    if (!pageNumber) {
        pageNumber = 1;
    }

    const x = { petitions: [] };
    await fetch(`${petitionUrl}?page=${pageNumber}&state=open`)
        .then((response) => response.json())
        .then((data) =>
            fixResponse(data)).then(
                stuff => x.petitions = stuff.petitions
            ).catch(error => {
                console.error(error);
            });

    return x.petitions !== [] ? x.petitions : null;
}

function toDate(input: string | null) {
    return input ? new Date(input) : null;
}

function hashtagify(input: string) {
    let x = input.split("-");
    x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
    return `#${x.join("")} `;
}

async function fixResponse(data): Promise<{
    links: Links;
    petitions: PetitionInterface[];
}> {
    const petitions = [];
    let petition;
    const dateVariables = [
        "created_at",
        "updated_at",
        "rejected_at",
        "opened_at",
        "closed_at",
        "moderation_threshold_reached_at",
        "response_threshold_reached_at",
        "government_response_at",
        "debate_threshold_reached_at",
        "scheduled_debate_date",
        "debate_outcome_at",
    ];
    for (let i = 0; i < data.data.length; i++) {
        petition = data.data[i].attributes;
        for (const variable of dateVariables) {
            petition[variable] = toDate(petition[variable]);
        }
        data.data[i].attributes = petition;
        petitions.push(data.data[i]);
    }
    return { links: data.links, petitions };
}

interface Page {
    links: Links;
    petitions: any[] | PetitionInterface[];
}

interface Links {
    self: string;
    first: string;
    last: string;
    next?: string;
    prev?: string;
}

interface PetitionInterface {
    type: string;
    id: number;
    links: Pick<Links, "self">;
    attributes: Attributes;
}

interface Attributes {
    action: string;
    background: string;
    additional_details: string;
    committee_note?: string;
    state: "open" | "closed";
    signature_count: number;
    created_at: Date;
    updated_at: Date;
    rejected_at?: Date;
    opened_at: Date;
    closed_at?: Date;
    moderation_threshold_reached_at?: Date;
    response_threshold_reached_at?: Date;
    government_response_at: Date;
    debate_threshold_reached_at?: Date;
    scheduled_debate_date?: Date;
    debate_outcome_at?: Date;
    creator_name: string;
    rejection?: Rejection;
    government_response?: GovernmentResponse;
    debate?: Debate;
    departments: Department[];
    topics: string[];
}

interface Debate {
    debated_on: string; //datetime
    transcript_url: string;
    video_url: string;
    debate_pack_url: string;
    overview: string;
}

interface Department {
    acronym: string;
    name: string;
    url: string;
}

interface GovernmentResponse {
    responded_on: string; //datetime
    summary: string;
    details: string;
    created_at: string; //datetime
    updated_at: string; //datetime
}

interface Rejection {
    code: string;
    details: string;
}