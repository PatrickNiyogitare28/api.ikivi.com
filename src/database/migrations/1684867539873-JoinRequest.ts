import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinRequest1684867539873 implements MigrationInterface {
  name = 'JoinRequest1684867539873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-23T18:45:47.885Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-23T18:45:47.885Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-23 18:44:58.175'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-23 18:44:58.175'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`,
    );
  }
}
