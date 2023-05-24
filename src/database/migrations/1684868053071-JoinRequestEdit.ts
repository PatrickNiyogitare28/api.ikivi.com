import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinRequestEdit1684868053071 implements MigrationInterface {
  name = 'JoinRequestEdit1684868053071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-23T18:54:21.866Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-23T18:54:21.866Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-23 18:53:59.066'`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-23 18:53:59.066'`,
    );
    await queryRunner.query(
      `ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`,
    );
  }
}
