import "reflect-metadata";
import {pgClient} from './pgClient';

async function getExpiredPetitionIds(): Promise<string[]> {
    const result = await pgClient.query(
        "SELECT id FROM petition WHERE deadline < now()"
    );

    console.log(`Found ${result.rowCount} expired petitions`);

    return result.rows.map(row => row.id);
}

export async function deletePetitionsById(ids: string[]) {
    await pgClient.query(
        "DELETE FROM petition WHERE id = ANY($1)",
        [ids]
    );

    console.log(`Deleted ${ids.length} petitions`);
}

export const deletePetitions = async () => getExpiredPetitionIds().then(ids => deletePetitionsById(ids));
