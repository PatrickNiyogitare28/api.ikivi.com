import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupMetadata1684774370245 implements MigrationInterface {
  name = 'GroupMetadata1684774370245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-22T16:52:55.924Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-22T16:52:55.924Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-22 16:52:02.053'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-22 16:52:02.053'`,
    );
  }
}
