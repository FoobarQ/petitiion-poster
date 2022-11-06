const petitionUrl =
  process.env.PETITION_URL || "https://petition.parliament.uk/petitions.json";

function toDate(input: string | null) {
  return input ? new Date(input) : null;
}

async function fixResponse(body: any): Promise<{
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
  for (const data of body.data) {
    petition = data.attributes;
    for (const variable of dateVariables) {
      petition[variable] = toDate(petition[variable]);
    }
    data.id = data.id.toString();
    data.attributes = petition;
    petitions.push(data);
  }

  return { links: body.links, petitions };
}

export async function getPetitions(
  pageNumber: number = 1
): Promise<PetitionInterface[]> {
  const x: { petitions: PetitionInterface[] } = { petitions: [] };
  await fetch(`${petitionUrl}?page=${pageNumber}&state=open`)
    .then((response) => response.json())
    .then((body) => fixResponse(body))
    .then((stuff) => (x.petitions = stuff.petitions))
    .catch((error) => {
      console.error(error);
    });

  return x.petitions;
}

export function shorten(long: string, targetLength: number) {
  if (long.length <= targetLength) {
    return long;
  }

  if (long.endsWith('"') || long.endsWith("'")) {
    return `${long.slice(0, targetLength - 4)}...${long.slice(
      long.length - 1
    )}`;
  }

  return `${long.slice(0, targetLength - 3)}...`;
}

export async function getOpenPetitionsPageCount(): Promise<number> {
  const { links } = await fetch(`${petitionUrl}?state=open`)
    .then((response) => response.json());

  return parseInt(links["last"].replaceAll(/[^\d]/g, ""));
}

export const getTweetOptions = (response?: boolean): TweetOptions => {
  let options: any = {
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
    }
  };
  if (!response)
    delete options.form.in_reply_to_status_id;
  return options;
};