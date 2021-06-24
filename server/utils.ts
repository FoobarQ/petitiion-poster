import fetch from "node-fetch";
const petitionUrl =
  process.env.PETITION_URL || "https://petition.parliament.uk/petitions.json";

function toDate(input: string | null) {
  return input ? new Date(input) : null;
}

async function fixResponse(data: any): Promise<{
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

export async function getPetitions(
  pageNumber: number = 1
): Promise<PetitionInterface[]> {
  const x: { petitions: PetitionInterface[] } = { petitions: [] };
  await fetch(`${petitionUrl}?page=${pageNumber}&state=open`)
    .then((response) => response.json())
    .then((data) => fixResponse(data))
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

  return long.slice(0, targetLength);
}
