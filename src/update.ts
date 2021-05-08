import "reflect-metadata";
import { createConnection, LessThan } from "typeorm";
import { Petition } from "./entity/Petition";
import fetch from "node-fetch";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "node:constants";
const request = require("request-promise");

const petitionUrl = process.env.PETITION_URL;
const UPDATE_LIMIT = process.env.UPDATE_LIMIT
  ? parseInt(process.env.UPDATE_LIMIT)
  : 2;
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
    in_reply_to_status_id: "1390725647329370114",
    status: "@UKPetitionPosts Computer says no",
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
  synchronize: true,
})
  .then(async (connection) => {
    let updatesMade = 0;
    try {
      console.log("Finding petitions to update");
      const petitions = await connection.manager.find(Petition, {
        where: [
          {
            response: false,
          },
          {
            debate: false,
          },
        ],
      });

      for (const petition of petitions) {
        await fetch(
          `https://petition.parliament.uk/petitions/${petition.id}.json`
        )
          .then((response) => response.json())
          .then((data) => data.data.attributes)
          .then((attributes) => {
            const { government_response, debate, signature_count } = attributes;

            petition.signature_count = signature_count;

            const tweets = [];

            if (!petition.response && government_response) {
              let tweetBody = `Government responded on ${government_response.responded_on}\n\n`;
              tweetBody += `Summary:  ${government_response.summary}\n\n`;
              tweetBody += `For more info, visit the link above.`;
              tweets.push(tweetBody);
              petition.response = true;
            }

            if (!petition.debate && debate) {
              let tweetBody = `Government debated on ${debate.debated_on}\n\n`;
              tweetBody += `Watch here: ${debate.video_url}\n`;
              tweets.push(tweetBody);
              petition.debate = true;
            }

            return tweets;
          })
          .then((tweets) => updateTweet(petition.tweetId, tweets))
          .then((tweetId) => {
            petition.tweetId = tweetId;
            connection.manager.update(
              Petition,
              {
                id: petition.id,
              },
              petition
            );
          })
          .then(() => {
            console.log(`Petition ${petition.id} updated.`);
            updatesMade++;
          })
          .catch((error) => {
            console.error(error);
            console.error("it's peak");
          });
        if (updatesMade >= UPDATE_LIMIT) {
          console.log("Process finished successfully");
          return 0;
        }
      }
      console.log("\nPetitions updated.");
      console.log("Process finished successfully");
    } catch (notFoundError) {
      console.log("Nothing to update.");
    }
  })
  .catch((error) => console.log(error));

async function updateTweet(tweetId: string, tweetBodies: string[]) {
  let tweetConfirmation = tweetId;

  for (const body of tweetBodies) {
    options.form.in_reply_to_status_id = tweetConfirmation;
    options.form.status = body;
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      tweetConfirmation = JSON.parse(response.body).id_str;
    });
  }

  return tweetConfirmation;
}
