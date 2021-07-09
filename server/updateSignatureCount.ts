import pg from "pg";
import { getPetitions } from "./utils";

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

async function updateSignatures() {
  try {
    const result = await client.query("SELECT id from actions");
    const id: {
      [key: number]: boolean;
    } = {};
    if (result.rows) {
      for (const row of result.rows) {
        id[parseInt(row.id)] = true;
      }
    }
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
        if (!id[petition.id]) {
          client.query("INSERT INTO actions (id, action) VALUES ($1, $2)", [
            petition.id,
            petition.attributes.action,
          ]);
        }
        client.query(
          "INSERT INTO signatures (time, id, signature_count) VALUES ($1, $2, $3)",
          [timestamp, petition.id, petition.attributes.signature_count]
        );
      }

      page++;
    }
  } catch (err) {}
}

updateSignatures();
