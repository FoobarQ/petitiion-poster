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

async function actuallyCompress(id: string) {
  const petitionSignatures = await client.query(
    "SELECT * FROM signatures WHERE id=$1 ORDER BY time",
    [id]
  );
  for (
    let rowIndex = 1;
    rowIndex < petitionSignatures.rowCount - 1;
    rowIndex++
  ) {
    if (
      petitionSignatures.rows[rowIndex - 1].signature_count ===
        petitionSignatures.rows[rowIndex].signature_count &&
      petitionSignatures.rows[rowIndex].signature_count ===
        petitionSignatures.rows[rowIndex + 1].signature_count
    ) {
      //deletes all middle elements in a series of repeating signature_counts
      client.query("DELETE FROM signatures WHERE id=$1 AND time=$2", [
        petitionSignatures.rows[rowIndex - 1].id,
        petitionSignatures.rows[rowIndex - 1].time,
      ]);
    }
  }
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
