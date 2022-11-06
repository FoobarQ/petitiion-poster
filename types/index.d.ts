interface Page {
  links: Links;
  petitions: any[] | PetitionInterface[];
}

interface Links {
  self: string;
  first: string;
  last: string;
  next?: string;
  prev?: string;
}

interface PetitionInterface {
  type: string;
  id: string;
  links: Pick<Links, "self">;
  attributes: Attributes;
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
}

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

interface TweetOptions {
  method: string;
  url: string;
  oauth: {
      consumer_key: string | undefined;
      consumer_secret: string | undefined;
      token: string | undefined;
      token_secret: string | undefined;
  };
  form: {
      in_reply_to_status_id?: string;
      status: string;
  };
}