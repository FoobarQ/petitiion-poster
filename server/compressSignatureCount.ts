import pg from "pg";

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

function deleteRedundantData(result: pg.QueryResult<any>, column: string) {
  if (result.rowCount < 3) {
    return null;
  }

  for (let rowIndex = 1; rowIndex < result.rowCount - 1; rowIndex++) {
    if (
      result.rows[rowIndex - 1][column] === result.rows[rowIndex][column] &&
      result.rows[rowIndex][column] === result.rows[rowIndex + 1][column]
    ) {
      //deletes all middle elements in a series of repeating signature_counts
      client.query("DELETE FROM signatures WHERE id=$1 AND time=$2", [
        result.rows[rowIndex - 1].id,
        result.rows[rowIndex - 1].time,
      ]);
    }
  }
  return result.rows[0][column];
}

async function actuallyCompress(id: string) {
  let result = await client.query(
    "SELECT * FROM signatures WHERE id=$1 AND time > NOW() - INTERVAL '26 hours' ORDER BY time",
    [id]
  );

  const oldest = deleteRedundantData(result, "signature_count");
  //TODO: remove this secondary clean up code.
  //      It wouldn't be necessary after the first run.
  result = await client.query(
    "SELECT * FROM signatures WHERE id=$1 AND signature_count=$2 ORDER BY time",
    [id, oldest]
  );
  deleteRedundantData(result, "signature_count");
}

async function compressSignatures() {
  try {
    const result = await client.query("SELECT DISTINCT id FROM signatures");
    if (result.rows) {
      for (const row of result.rows) {
        actuallyCompress(row.id);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

compressSignatures();
