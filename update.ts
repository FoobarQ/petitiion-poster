import "reflect-metadata";
import fetch from "node-fetch";
import request from "request-promise";
import pg from "pg";
import { shorten } from "./utils";

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

export async function updatePetitions() {
  let updatesMade = 0;
  try {
    console.log("Finding petitions to update");
    const petitions = await client.query(
      "SELECT * FROM petition WHERE response = FALSE OR debate = FALSE"
    );

    for (const petition of petitions.rows) {
      await fetch(
        `https://petition.parliament.uk/petitions/${petition.id}.json`
      )
        .then((response) => response.json())
        .then((data) => data.data.attributes)
        .then(
          (attributes: Attributes) =>
            new Promise<string[]>((resolve, reject) => {
              const { government_response, debate } = attributes;

              const tweets = [];

              if (!petition.response && government_response) {
                const tweetstart = `Govt. response from ${government_response.responded_on}:\n\n`;
                const tweetEnd = `Click the link above for more info.`;
                const tweetBody = `"${tweetstart +
                  shorten(
                    government_response.summary,
                    280 - (tweetstart.length + tweetEnd.length + 4)
                  )
                  }"\n\n${tweetEnd}`;
                tweets.push(tweetBody);
                petition.response = true;
              }

              if (!petition.debate && debate) {
                let tweetBody = "";
                if (debate.debated_on) {
                  tweetBody = `Debated on ${debate.debated_on}\n\n`;
                  tweetBody += `Watch here: ${debate.video_url}\n`;
                } else {
                  tweetBody = shorten(`"${debate.overview}"`, 275);
                }

                tweets.push(tweetBody);
                petition.debate = true;
              }

              if (tweets.length > 0) {
                return resolve(tweets);
              } else {
                return reject(`it has no updates`);
              }
            })
        )
        .then((tweets) => updateTweet(petition.tweetid, tweets, petition.id))
        .then((tweetId) => {
          petition.tweetId = tweetId;
          return client.query(
            'UPDATE petition SET "tweetid" = $1, response = $2, debate = $3 WHERE id = $4',
            [petition.tweetId, petition.response, petition.debate, petition.id]
          );
        })
        .then(() => {
          updatesMade++;
        })
        .catch((error) => {
          console.error(
            `Update failed for Petition (${petition.id}) because ${error}`
          );
        });
      if (updatesMade >= UPDATE_LIMIT) {
        console.log("\nPetitions updated.");
        return;
      }
    }
  } catch (notFoundError) {
    console.log("Nothing to update.");
  }
}

async function updateTweet(
  tweetId: string,
  tweetBodies: string[],
  petitionId: string
) {
  let tweetConfirmation = tweetId;

  for (const body of tweetBodies) {
    options.form.in_reply_to_status_id = tweetConfirmation;
    options.form.status = body;
    await request(options, (error: any, response) => {
      if (error) throw new Error(error);
      tweetConfirmation = JSON.parse(response.body).id_str;
      const timestamp = new Date(JSON.parse(response.body).created_at)
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      return client.query(
        "INSERT INTO tweets (time, id, tweetid) VALUES ($1, $2, $3)",
        [timestamp, petitionId, tweetConfirmation]
      );
    });
  }

  return tweetConfirmation;
}

updatePetitions();
