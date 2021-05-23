<template>
  <div class="home" v-if="$store.state.status">
    <div>
      <h1 >
        <a  :href="link">{{ $store.state.petition.action }}</a>
      </h1>
      <div>
        <h2>by {{ $store.state.petition.creator_name }}</h2>
      </div>
    </div>
    <LineChart />
    <div class="green">
      <HelloWorld :title="'Background'" :text="$store.state.petition.background" :continued="$store.state.petition.additional_details"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import request from "request-promise";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";
import {State, Getter} from 'vuex-class';
import {AppState} from '@/store';

interface Debate {
  debated_on: string; //datetime
  transcript_url: string;
  video_url: string;
  debate_pack_url: string;
  overview: string;
}

interface Department {
  acronym: string;
  name: string;
  url: string;
}

interface GovernmentResponse {
  responded_on: string; //datetime
  summary: string;
  details: string;
  created_at: string; //datetime
  updated_at: string; //datetime
}

interface Rejection {
  code: string;
  details: string;
}

interface Country {
  name: string;
  code: string;
  signature_count: number;
}

interface Constituency {
  name: string;
  ons_code: string;
  mp: string;
  signature_count: number;
}

interface Region {
  name: string;
  ons_code: string;
  signature_count: number;
}

interface Attributes {
  action: string;
  background: string;
  additional_details: string;
  committee_note?: string;
  state: "open" | "closed";
  signature_count: number;
  created_at: Date;
  updated_at: Date;
  rejected_at?: Date;
  opened_at: Date;
  closed_at?: Date;
  moderation_threshold_reached_at?: Date;
  response_threshold_reached_at?: Date;
  government_response_at: Date;
  debate_threshold_reached_at?: Date;
  scheduled_debate_date?: Date;
  debate_outcome_at?: Date;
  creator_name: string;
  rejection?: Rejection;
  government_response?: GovernmentResponse;
  debate?: Debate;
  departments: Department[];
  topics: string[];
  signatures_by_country: Country[];
  signatures_by_constituency: Constituency[];
  signatures_by_region: Region[];
  other_parliamentary_business: any[];
}

interface Data {
  type: string;
  id: number;
  attributes: Attributes;
}

interface Links {
  self: string;
}

@Component({
  components: {
    LineChart,
    HelloWorld,
    PieChart,
  },
})
export default class Home extends Vue {
  @Getter('link')
  link!: string;

  async mounted() {
    await this.$store.dispatch('setPetitionId', this.$route.params.id);
    console.log("yahteet");
    setInterval(this.handlePetitionResponse, 5 * 1000);
  }

  async handlePetitionResponse(): Promise<void> {
    const options = {
      method: "GET",
      url: `${this.link}.json`,
    };
    const whatever = await request(options);
    this.$store.commit('setPetition', JSON.parse(whatever).data.attributes);
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #080;
}


h1 + div{
    position: relative;
    background: #080;
    color: white;
    bottom: 0px;
    margin: 0;

    h2 {
      margin: 0;
    }
  }


.home > div {
  position: sticky;
}


</style>
