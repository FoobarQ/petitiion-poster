import typeorm from "typeorm";

@typeorm.Entity()
export default class Petition {
  @typeorm.PrimaryColumn()
  id!: string;

  @typeorm.Column()
  deadline!: Date;

  @typeorm.Column()
  tweetId!: string;

  @typeorm.Column()
  signature_count!: number;

  @typeorm.Column({default: false})
  response!: boolean;

  @typeorm.Column({default: false})
  debate!: boolean;
}

