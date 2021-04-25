import "reflect-metadata";
import { createConnection, LessThan } from "typeorm";
import { Petition } from "./entity/Petition";

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
        console.log("Finding outdated petitions")
        const petitions = await connection.manager.find(Petition, {
            where: {
                deadline: LessThan(new Date().toISOString().replace("T", " ").replace("Z", ""))
            }
        });

        for (const petition of petitions) {
          await deleteTweet(petition.tweetId);
          console.log("Deleting database entry...")
          connection.manager.delete(Petition, petition)
          .then(() => console.log(" Deleted."));
        }

    } catch (notFoundError) {
        console.log("Nothing to delete.");
    }
    console.log("Done.")
}).catch(error => console.log(error));


async function deleteTweet(tweetId: string) {
  console.log(`Deleting tweet ${tweetId}...`)
  const previous = await client
  .get(`statuses/destroy/${tweetId}.json`)
  .then(response => response.json())
  .then(data => data.in_reply_to_status_id_str);
  previous? deleteTweet(previous) : console.log("  Deleted.")
}