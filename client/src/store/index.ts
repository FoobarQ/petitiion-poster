import Vue from "vue";
import Vuex from "vuex";
import request from "request-promise";

Vue.use(Vuex);

function titleify(input: string) {
  let x = input.split(" ");
  x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
  return `${x.join(" ")}`;
}

const defaultState = (): AppState => {
  return {
    petitionId: 0,
    petition: {},
    status: false,
    ready: false,
    keyPairs: {},
    showRealtime: true,
    chartOptions: {
      series: [
        {
          name: "Needs to be here for some reason.",
          color: "#000",
          data: [], // sample data.
          showInLegend: false,
          visible: false,
        },
      ],
      xAxis: {
        type: "datetime",
        gridLineDashStyle: "dashed",
        lineColor: "black",
        lineWidth: "2",
      },
      yAxis: {
        allowDecimals: false,
        gridLineColor: "white",
        plotLines: [
          {
            label: {
              text: "Response Threshold",
            },
            color: "lightgrey",
            width: 2,
            value: 10000,
            dashStyle: "LongDash",
          },
          {
            label: {
              text: "Debate Threshold",
            },
            color: "lightgrey",
            width: 2,
            value: 100000,
            dashStyle: "LongDash",
          },
        ],
        title: {
          text: "Signatures",
        },
      },
      chart: {
        ignoreHiddenSeries: true,
        colorCount: 50,
        panning: {
          enabled: true,
        },
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false,
          },
        },
      },
      title: {
        text: "",
      },
    },
    signature_counts: {},
  };
};

export default new Vuex.Store({
  state: defaultState(),
  mutations: {
    setPetition: (state: AppState, petition) => {
      state.petition = petition;
    },
    setPetitionId: (state: AppState, petitionId) => {
      state.petitionId = petitionId;
    },
    resetStore: (state: AppState) => Object.assign(state, defaultState()),
  },
  getters: {
    link: (state) =>
      `https://petition.parliament.uk/petitions/${state.petitionId}`,
    petitionId: (state) => state.petitionId,
    action: (state) =>
      state.petition.action ? titleify(state.petition.action) : "",
    background: (state) => (state.petition ? state.petition.background : ""),
    creator_name: (state) =>
      state.petition ? state.petition.creator_name : "",
    additional_details: (state) =>
      state.petition ? state.petition.additional_details : "",
    signatures_by_region: (state) =>
      state.petition ? state.petition.signatures_by_region : 0,
    signatures_by_country: (state) =>
      state.petition ? state.petition.signatures_by_country : 0,
    signatures_by_constituency: (state) =>
      state.petition ? state.petition.signatures_by_constituency : 0,
    signature_count: (state) =>
      state.petition ? state.petition.signature_count : 0,
    chartOptions: (state) => state.chartOptions,
    showRealtime: (state) => state.showRealtime,
  },
  actions: {
    setPetitionId: (context, petitionId) => {
      context.state.ready = false;
      context.commit("resetStore");
      context.commit("setPetitionId", petitionId);
      handlePetitionResponse(context.getters.link)
        .then((petition) => {
          context.commit("setPetition", petition);
          context.state.status = true;
        })
        .catch(() => {
          context.state.status = false;
        })
        .finally(() => {
          context.state.ready = true;
        });
    },
  },
  modules: {},
});

export interface AppState {
  showRealtime: boolean;
  petition: Partial<Attributes>;
  petitionId: number;
  link?: string;
  status: boolean;
  ready: boolean;
  keyPairs: {
    [key: string]: number;
  };
  chartOptions: any;
  signature_counts: {
    [key: string]: number;
  };
}

async function handlePetitionResponse(url: string): Promise<Attributes> {
  const options = {
    method: "GET",
    url: `${url}.json`,
  };
  const whatever = await request(options);
  return JSON.parse(whatever).data.attributes;
}

/*keyPairs: { [key: string]: number } = {
  signature_count: 0,
};*/
