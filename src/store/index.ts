import Vue from "vue";
import Vuex from "vuex";
import request from "request-promise";

Vue.use(Vuex);

function titleify(input: string) {
  let x = input.split(" ");
  x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
  return `${x.join(" ")}`;
}

export default new Vuex.Store({
  state: {
    petitionId: 0,
  },
  mutations: {
    setPetition: (state: AppState, petition) => {
      state.petition = petition;
    },
    setPetitionId: (state: AppState, petitionId) => {
      state.petitionId = petitionId;
    },
  },
  getters: {
    link: (state) =>
      `https://petition.parliament.uk/petitions/${state.petitionId}`,
    petitionId: (state) => state.petitionId,
    action: (state) => (state.petition ? titleify(state.petition.action) : ""),
    background: (state) => (state.petition ? state.petition.background : ""),
    creator_name: (state) =>
      state.petition ? state.petition.creator_name : "",
    additional_details: (state) =>
      state.petition ? state.petition.additional_details : "",
    signatures_by_region: (state) =>
      state.petition ? state.petition.signatures_by_region : "",
    signatures_by_country: (state) =>
      state.petition ? state.petition.signatures_by_country : "",
    signatures_by_constituency: (state) =>
      state.petition ? state.petition.signatures_by_constituency : "",
    signature_count: (state) =>
      state.petition ? state.petition.signature_count : 0,
  },
  actions: {
    setPetitionId: (context, petitionId) => {
      context.commit("setPetitionId", petitionId);
      handlePetitionResponse(context.getters.link).then((petition) => {
        context.commit("setPetition", petition);
      });
    },
  },
  modules: {},
});

export interface AppState {
  petition?: Attributes;
  petitionId: number;
  link?: string;
}

async function handlePetitionResponse(url: string): Promise<Attributes> {
  const options = {
    method: "GET",
    url: `${url}.json`,
  };
  const whatever = await request(options);
  return JSON.parse(whatever).data.attributes;
}
