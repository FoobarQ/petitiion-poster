import express from "express";
import "reflect-metadata";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const app = express();
const port = process.env.PORT || 3080;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.disable("x-powered-by");

app.get("/api/tweet/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM petition WHERE id=$1", [
      req.params.id,
    ]);
    if (result.rows[0]) {
      res.json(result.rows[0].tweetId);
    }
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/signatures/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT time, signature_count FROM signatures WHERE id=$1 ORDER BY time",
      [req.params.id]
    );

    const response = [];
    for (const row of result.rows) {
      response.push([new Date(row.time).getTime(), row.signature_count]);
    }
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/tweets/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT time, tweetid FROM tweets WHERE id=$1 ORDER BY time",
      [req.params.id]
    );

    if (result.rows) {
      const response = [];
      for (const row of result.rows) {
        response.push([new Date(row.time).getTime(), row.tweetid]);
      }
      res.json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/actions", async (req, res) => {
  try {
    const response = [];

    if (req.body.orderBy !== "signature_count") {
      const query = `SELECT id, action FROM actions ORDER BY ${
        req.body.orderBy === "action" ? "action" : "id"
      } ${req.body.order === "ASC" ? "ASC" : "DESC"} LIMIT $1 OFFSET $2`;
      const result = await pool.query(query, [req.body.limit, req.body.offset]);

      for (const row of result.rows) {
        response.push({ id: row.id, action: row.action });
      }
    } else {
      let query = `SELECT DISTINCT id FROM (SELECT id, signature_count FROM signatures ORDER BY signature_count ${
        req.body.order === "ASC" ? "ASC" : "DESC"
      }) AS nested LIMIT $1 OFFSET $2`;
      const result = await pool.query(query, [req.body.limit, req.body.offset]);
      query = "SELECT id, action FROM actions WHERE id IN (";
      const orderedMapping = [];
      for (const row of result.rows) {
        response.push({ id: row.id, action: "" });
        query += `$${response.length}, `;
        orderedMapping.push(row.id);
      }
      query = `${query.slice(0, query.length - 2)});`;
      const result2 = await pool.query(query, orderedMapping);

      for (const row of result2.rows) {
        response[orderedMapping.indexOf(row.id)].action = row.action;
      }
    }
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
