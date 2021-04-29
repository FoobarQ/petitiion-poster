import "reflect-metadata";
import { createConnection, LessThan } from "typeorm";
import { Petition } from "./entity/Petition";
import fetch from "node-fetch";

const petitionUrl = process.env.PETITION_URL;
const Twitter = require("twitter-lite");

const client = new Twitter({
    subdomain: "api",
    version: "1.1",
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

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
    try {
        console.log("Finding petitions to update")
        const petitions = await connection.manager.find(Petition, {
            where: [
                    {
                      response: false
                    },
                    {
                      debate: false
                    }
                  ]
        });

        for (const petition of petitions) {
          fetch(`https://petition.parliament.uk/petitions/${petition.id}.json`)
          .then(response => response.json())
          .then(data => data.attributes)
          .then(attributes => {
            const {
              government_response, 
              debate,
              signature_count
            } = attributes;

            petition.signature_count = signature_count;

            const tweets = [];

            if (!petition.response && government_response) {
              let tweetBody = `Government responded on ${government_response.response_on}\n\n`;
              tweetBody += `Here's the summary: "${government_response.summary}"\n`;
              tweetBody += `For more info, visit the link above.`;
              tweets.push(tweetBody);
              petition.response = true;
            }

            if (!petition.debate && debate) {
              let tweetBody = `Government debated on ${debate.debated_on}\n\n`;
              tweetBody += `Watch here: "${government_response.video_url}"\n`;
              tweets.push(tweetBody);
              petition.debate = true;
            }

            return tweets;
          })
          .then(tweets => updateTweet(petition.tweetId, tweets))
          .then(tweetId => {
            petition.tweetId = tweetId;
            connection.manager.update(Petition, {
              id: petition.id,
            }, petition)
          }).then(() => console.log(`Petition ${petition.id} updated.`))
          .catch(() => console.error("it's peak"));
        }

    } catch (notFoundError) {
        console.log("Nothing to update.");
    }
    console.log("Done.")
}).catch(error => console.log(error));


async function updateTweet(tweetId: string, tweetBodies: string[]) {
  let tweetConfirmation;
  for (const body of tweetBodies) {
    await client
    .get("account/verify_credentials")
    .then(client.post("statuses/update", { status: body, in_reply_to_status_id: parseInt(tweetId) }))
    .then((data) => {
        tweetConfirmation = data["id_str"];
    })
    .catch((error) => console.error(error));
  }

  return tweetConfirmation;
}

