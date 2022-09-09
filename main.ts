import { createPetitions } from './create';
import { updatePetitions } from './update';
import { deletePetitions } from './delete';

const main = () => deletePetitions().then(() => createPetitions()).then(() => updatePetitions());
main();
