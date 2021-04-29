import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Petition {
  @PrimaryColumn()
  id: string;

  @Column()
  deadline: Date;

  @Column()
  tweetId: string;

  @Column()
  signature_count: number;

  @Column()
  response: boolean;

  @Column()
  debate: boolean;
}