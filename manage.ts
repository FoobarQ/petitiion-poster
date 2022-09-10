import { createPetitions } from './create';
import { updatePetitions } from './update';
import { deletePetitions } from './delete';

async function thisaf() {
    await deletePetitions();
    await createPetitions();
    await updatePetitions();
}