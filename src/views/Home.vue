<template>
  <div class="home">
    <div>
      <h1>
        <a :href="link">{{ action }}</a>
      </h1>
      <div>
        <h2>by {{ creator_name }}</h2>
      </div>
    </div>
    <LineChart :petitionId="586559" />
    <div class="green">
      <HelloWorld :title="'Background'" :text="background" :continued="additional_details"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import request from "request-promise";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";

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
  action = "";
  background = "";
  additional_details = "";
  link = "https://petition.parliament.uk/petitions/586559";
  creator_name = "";

  mounted() {
    this.handlePetitionResponse().then((petition) => {
      this.background = petition.background;
      this.additional_details = petition.additional_details;
      this.action = this.titleify(petition.action);
      this.creator_name = petition.creator_name;
    });
  }

  async handlePetitionResponse(): Promise<Attributes> {
    const options = {
      method: "GET",
      url: `${this.link}.json`,
    };
    const whatever = await request(options);
    return JSON.parse(whatever).data.attributes;
  }

  titleify(input: string) {
    let x = input.split(" ");
    x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
    return `${x.join(" ")}`;
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
