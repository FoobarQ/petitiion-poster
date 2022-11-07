import {dbClient} from './dbClient';

async function getExpiredPetitionIds(): Promise<string[]> {
    const result = await dbClient.petition.findMany({
        select: {
            id: true
        },
        where: {
            deadline: {
                lt: new Date()
            }
        }
    })

    console.log(`Found ${result.length} expired petitions`);

    return result.map(row => row.id);
}

export async function deletePetitionsById(ids: string[]) {
    await dbClient.petition.deleteMany({
        where: {
            id: {
                in: ids,
            }
        }
    });

    console.log(`Deleted ${ids.length} petitions`);
}

export const deletePetitions = async () => getExpiredPetitionIds().then(ids => deletePetitionsById(ids));
