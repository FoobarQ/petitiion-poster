import { createPetitions } from './create';
import { updatePetitions } from './update';
import { deletePetitions } from './delete';

async function manage() {
    await deletePetitions();
    await createPetitions();
    await updatePetitions();
}

manage();