import express from "express";
import "reflect-metadata";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

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

const pool = new pg.Pool({
  user: process.env.TIMESCALE_USER || "user",
  host: process.env.TIMESCALE_HOST || "host",
  database: process.env.TIMESCALE_DB || "",
  password: process.env.TIMESCALE_PASSWORD || "",
  port: parseInt(process.env.TIMESCALE_PORT || "0"),
  ssl: {
    rejectUnauthorized: false,
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
  try {
    const result = await pool.query(
      "SELECT time, signature_count FROM signatures WHERE id=$1",
      [req.params.id]
    );

    if (result.rows) {
      const response = [];
      for (const row of result.rows) {
        response.push([new Date(row.time).getTime(), row.signature_count]);
      }
      response.sort((a, b) => a[0] - b[0]);
      res.json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
