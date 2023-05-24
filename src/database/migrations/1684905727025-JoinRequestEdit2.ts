import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinRequestEdit21684905727025 implements MigrationInterface {
  name = 'JoinRequestEdit21684905727025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-24T05:22:19.620Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-24T05:22:19.620Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-24 05:21:41.746'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-24 05:21:41.746'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`,
    );
  }
}
