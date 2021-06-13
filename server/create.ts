import "reflect-metadata";
import typeorm from "typeorm";
import Petition from "./entity/Petition";
import request from "request-promise";
import { getPetitions } from "./utils";
import pg from "pg";

const client = new pg.Pool({
  user: process.env.TIMESCALE_USER || "user",
  host: process.env.TIMESCALE_HOST || "host",
  database: process.env.TIMESCALE_DB || "",
  password: process.env.TIMESCALE_PASSWORD || "",
  port: parseInt(process.env.TIMESCALE_PORT || "0"),
  ssl: {
    rejectUnauthorized: false,
  },
});

const options = {
  method: "POST",
  url: "https://api.twitter.com/1.1/statuses/update.json",
  oauth: {
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  form: {
    status: "@UKPetitionPosts Computer says no",
  },
};

const TWEET_LIMIT = process.env.TWEET_LIMIT
  ? parseInt(process.env.TWEET_LIMIT)
  : 2;
typeorm
  .createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [Petition],
    synchronize: true, // I don't like it, but it's needed to keep secrets secret
  })
  .then(async (connection) => {
    let tweetsMade = 0;
    let page = 1;

    while (tweetsMade < TWEET_LIMIT) {
      console.log("Retrieving petitions...");

      let petitions: PetitionInterface[] = (await getPetitions(page)) || [];
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
              id: `${petition.id}`,
            },
          });
        } catch (notFoundError) {
          console.log("NEW PETITION: " + petition.attributes.action);
        }

        if (entity === undefined) {
          console.log("Making tweet...");
          await composeTweet(petition)
            .then((tweet) => postTweet(tweet))
            .then(async (tweetConfirmation) => {
              const tweetId = tweetConfirmation.id_str;
              const tweetTimestamp = tweetConfirmation.created_at;
              console.log("  Success.");
              console.log("Updating database...");
              const petitionEntry = new Petition();
              petitionEntry.deadline = new Date(petition.attributes.opened_at);
              let month = petitionEntry.deadline.getMonth() + 6;
              let year =
                month > 11
                  ? petitionEntry.deadline.getFullYear() + 1
                  : petitionEntry.deadline.getFullYear();
              month = month % 12;
              petitionEntry.deadline.setMonth(month);
              petitionEntry.deadline.setFullYear(year);
              petitionEntry.tweetId = String(tweetId);
              petitionEntry.id = String(petition.id);
              petitionEntry.signature_count =
                petition.attributes.signature_count;

              await client.query(
                "INSERT INTO tweets (time, id, tweetid) VALUES ($1, $2, $3)",
                [tweetTimestamp, petition.id, tweetId]
              );
              return connection.manager.save(petitionEntry);
            })
            .then((pet) => {
              console.log("  Success.");
              console.log(`Saved a new petition with id: ${pet.id}\n\n`);
              tweetsMade++;
            });
          if (tweetsMade >= TWEET_LIMIT) {
            console.log("Process finished successfully.");
            return 0;
          }
        }
      }
      page++;
    }
    console.log("No new petitions to post.");
  })
  .catch((error) => console.log(error));

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
  tweet += status ? `\n\n${status}.` : "\n\n";
  tweet += `\nDeadline: ${deadline.toLocaleDateString("en-GB", {
    timeZone: "UTC",
  })}`;
  tweet += `\n${
    topics ? topics.map((element) => hashtagify(element)) : ""
  }#UKPetition #UK #UnitedKingdom`;
  tweet += `\n${links.self.replace(".json", "")}`;
  return tweet;
}

async function postTweet(tweet: string) {
  let tweetConfirmation: any;
  options.form.status = tweet;
  await request(options, (error: any, response) => {
    if (error) throw new Error(error);
    tweetConfirmation = JSON.parse(response.body);
  });

  return tweetConfirmation;
}

function hashtagify(input: string) {
  let x = input.split("-");
  x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
  return `#${x.join("")} `;
}
