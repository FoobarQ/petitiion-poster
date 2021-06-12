import pg from "pg";
import { getPetitions } from "./utils";

const client = new pg.Client({
  user: process.env.TIMESCALE_USER || "user",
  host: process.env.TIMESCALE_HOST || "host",
  database: process.env.TIMESCALE_DB || "",
  password: process.env.TIMESCALE_PASSWORD || "",
  port: parseInt(process.env.TIMESCALE_PORT || "0"),
  ssl: {
    rejectUnauthorized: false,
  },
});

async function updateSignatures() {
  let page = 1;
  while (true) {
    const petitions: PetitionInterface[] = await getPetitions(page);
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");

    if (petitions.length < 1) {
      console.log("page limit reached.");
      return;
    }

    for (const petition of petitions) {
      client.query(
        "INSERT INTO signatures (time, id, signature_count) VALUES ($1, $2, $3)",
        [timestamp, petition.id, petition.attributes.signature_count]
      );
    }

    page++;
  }
}

updateSignatures();
