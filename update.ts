import request from "request-promise";
import { shorten, getTweetOptions } from "./utils";
import { deletePetitionsById } from "./delete";
import {dbClient} from './dbClient';

const UPDATE_LIMIT = process.env.UPDATE_LIMIT
  ? parseInt(process.env.UPDATE_LIMIT)
  : 2;
const options = getTweetOptions(true);

export async function updatePetitions() {
  let updatesMade = 0;
  let petitionsToDelete = [];
  try {
    console.log("Finding petitions to update");
    const petitions = await dbClient.petition.findMany({
      where: {
        OR: [
          {
            response: false
          },
          {
            debate: false
          },
        ]
      }
    });

    for (const petition of petitions) {
      const { data, error } = await fetch(
        `https://petition.parliament.uk/petitions/${petition.id}.json`
      ).then((response) => response.json());

      if (error) {
        switch (error) {
          case "Gone":
            console.log(`Petition ${petition.id} no longer exists`);
            petitionsToDelete.push(petition.id);
            break;
          default:
            console.error(`Petition ${petition.id} Error: ${error}`);
        }
        continue; //mark for delete

      }

      const { government_response, debate } = data.attributes;

      const tweets = [];

      if (!petition.response && government_response) {
        const tweetStart = `Govt. response from ${government_response.responded_on}:`;
        const tweetEnd = `Click the link above for more info.`;
        const tweetFormatLength = 280 - (tweetStart.length + tweetEnd.length + 6)
        const shortenGovtResponse = shorten(government_response.summary, tweetFormatLength)
        const tweetBody = [tweetStart, shortenGovtResponse, tweetEnd].join("\n\n");
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

      if (!tweets.length)
        continue

      const tweetid = await updateTweet(petition.tweetid, tweets, petition.id);

      petition.tweetid = tweetid;
      await dbClient.petition.update(
        {
          where: {
            id: petition.id,
          },
          data: {
            ...petition
          }
        }
      )
      
      updatesMade++;

      if (updatesMade >= UPDATE_LIMIT) {
        break;
      }
    }
    console.log("Update finished.");
    if (petitionsToDelete.length) {
      console.log("Deleting broken petitions");
      deletePetitionsById(petitionsToDelete);
    }
  } catch (notFoundError) {
    console.log("Nothing to update.");
  }
}

async function updateTweet(
  tweetId: string | null,
  tweetBodies: string[],
  petitionId: string
) {
  let tweetConfirmation = tweetId ?? "";

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
      return dbClient.tweets.create({
        data: {
          time: timestamp,
          id: petitionId,
          tweetid: tweetConfirmation
        }
      });
    });
  }

  return tweetConfirmation;
}
