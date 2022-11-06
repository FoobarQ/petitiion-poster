import request from "request-promise";
import { getOpenPetitionsPageCount, getPetitions, shorten } from "./utils";
import {dbClient} from './dbClient';


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

export async function createPetitions(): Promise<number | void> {
  let tweetsMade = 0;
  let page = 1;
  let pageCount = await getOpenPetitionsPageCount();

  while (tweetsMade < TWEET_LIMIT && page <= pageCount) {
    console.log(`Petition page ${page} of ${pageCount} pages...`);

    let petitions: PetitionInterface[] = (await getPetitions(page)) || [];

    for (const petition of petitions) {

      const entity = await dbClient.petition.findUnique({
        where: {
          id: petition.id,
        }
      })

      if (entity) {
        //already tracking this petition
        continue;
      }

      if (petition.attributes.debate_outcome_at && petition.attributes.debate_outcome_at.getTime() < Date.now()) {
        //already processed and deleted this petition from the database
        continue;
      }

      console.log("NEW PETITION: " + petition.attributes.action);

      await composeTweet(petition)
        .then((tweet) => postTweet(tweet))
        .then(async (tweetConfirmation) => {
          const tweetId = tweetConfirmation.id_str;
          const tweetTimestamp = tweetConfirmation.created_at;

          const petitionEntry: any = {};
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
          petitionEntry.signature_count = petition.attributes.signature_count;

          dbClient.tweets.create({
            data: {
              id: petition.id,
              time: tweetTimestamp,
              tweetid:tweetId
            }
          });
 
          dbClient.petition.create({
            data: {
              id: petitionEntry.id,
              deadline: petitionEntry.deadline,
              tweetid: petitionEntry.tweetId,
              signature_count: petitionEntry.signature_count
            }
          });
        })
        .then(() => {
          tweetsMade++;
        });
    }
    page++;
  }
  console.log(`Tweet count: ${tweetsMade}, no more new petitions to post.`);
}

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
    if (debate_outcome_at && new Date().getTime() < debate_outcome_at.getTime())
      status += ", awaiting debate outcome";
    else if (scheduled_debate_date && new Date().getTime() < scheduled_debate_date.getTime())
      status += ", awaiting debate";
    else
      status += ", debate date not set";
  }

  let tweet = status ? `\n\n${status}.` : "\n\n";
  tweet += `\nDeadline: ${deadline.toLocaleDateString("en-GB", {
    timeZone: "UTC",
  })}`;
  tweet += `\n${topics ? topics.map((element) => hashtagify(element)) : ""
    }#UKPetition #UK #UnitedKingdom`;
  tweet = `Petition: ${shorten(action, 280 - (tweet.length + 34)) + tweet}`;
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

