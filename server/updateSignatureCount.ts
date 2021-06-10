import sequelize from "sequelize";
import { getPetitions } from "./utils";

const sequelise = new sequelize.Sequelize(process.env.TIMESCALE_URL || "", {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
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
      sequelise.query({
        query:
          "INSERT INTO signatures (time, id, signature_count) VALUES (?, ?, ?)",
        values: [timestamp, petition.id, petition.attributes.signature_count],
      });
    }
    page++;
  }
}
sequelise
  .authenticate()
  .then(() => {
    updateSignatures();
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });
