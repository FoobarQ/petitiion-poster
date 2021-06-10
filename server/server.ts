import express from "express";
import "reflect-metadata";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import typeorm from "typeorm";
import Petition from "./entity/Petition.js";

let conn: typeorm.Connection;
async function setupConnection(): Promise<void> {
  conn = await typeorm.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [Petition],
  });
  console.log("Database online");
}

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

setupConnection();
const app = express();
const port = process.env.PORT || 3080;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/api/tweet/:id", async (req, res) => {
  const entity = await conn.manager.findOne(Petition, {
    where: {
      id: `${req.params.id}`,
    },
  });
  if (entity) {
    res.json(entity.tweetId);
  }
});

app.get("/api/signatures/:id", async (req, res) => {
  const result = await sequelise
    .authenticate()
    .then(() =>
      sequelise.query({
        query: "SELECT time, signature_count FROM signatures WHERE id=?;",
        values: [req.params.id],
      })
    )
    .catch((err: any) => {
      console.error("Unable to connect to the database:", err);
    });

  if (result) {
    res.json(result[0]);
  }
});

app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
