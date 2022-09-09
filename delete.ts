import "reflect-metadata";
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

async function getExpiredPetitionIds(): Promise<string[]> {
    const result = await client.query(
        "SELECT id FROM petition WHERE deadline < now()"
    );

    console.log(`Found ${result.rowCount} expired petitions`);

    return result.rows.map(row => row.id);
}

async function getDebatedPetitionsIds(): Promise<string[]> {
    const result = await client.query(
        "SELECT id FROM petition WHERE response = TRUE AND debate = TRUE"
    );

    console.log(`Found ${result.rowCount} petitions that have been debated`);

    return result.rows.map(row => row.id);
}

async function deletePetitionsById(ids: string[]) {
    await client.query(
        "DELETE FROM petition WHERE id = ANY($1)",
        [ids]
    );

    console.log(`Deleted ${ids.length} petitions`);

    return ids.length;
}

getExpiredPetitionIds()
    .then((ids) => deletePetitionsById(ids))
    .then(() => getDebatedPetitionsIds())
    .then((ids) => deletePetitionsById(ids))