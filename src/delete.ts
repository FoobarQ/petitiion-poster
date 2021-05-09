import "reflect-metadata";
import { createConnection, LessThan } from "typeorm";
import { Petition } from "./entity/Petition";
const request = require("request-promise");

const options = {
  method: "POST",
  url: "https://api.twitter.com/1.1/statuses/destroy.json",
  oauth: {
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [__dirname + "/entity/*"],
  synchronize: true, // I don't like it, but it's needed to keep secrets secret
})
  .then(async (connection) => {
    try {
      console.log("Finding outdated petitions");
      const petitions = await connection.manager.find(Petition, {
        where: {
          deadline: LessThan(
            new Date().toISOString().replace("T", " ").replace("Z", "")
          ),
        },
      });

      for (const petition of petitions) {
        await deleteTweet(petition.tweetId);
        console.log("Deleting database entry...");
        connection.manager
          .delete(Petition, petition)
          .then(() => console.log(" Deleted."));
      }
    } catch (notFoundError) {
      console.log("Nothing to delete.");
    }
    console.log("Done.");
  })
  .catch((error) => console.log(error));

async function deleteTweet(tweetId: string) {
  console.log(`Deleting tweet ${tweetId}...`);
  let previous;
  options.url = `https://api.twitter.com/1.1/statuses/destroy/${tweetId}.json`;
  await request(options, function (error, response) {
    if (error) throw new Error(error);
    previous = JSON.parse(response.body).in_reply_to_status_id_str;
  });

  previous ? deleteTweet(previous) : console.log("  Deleted.");
}
