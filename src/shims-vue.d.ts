declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
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
}
