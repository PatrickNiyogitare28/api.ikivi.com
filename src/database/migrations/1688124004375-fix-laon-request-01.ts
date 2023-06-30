import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLaonRequest011688124004375 implements MigrationInterface {
    name = 'fixLaonRequest011688124004375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan-requests" RENAME COLUMN "amount" TO "balance"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "balance" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'-requests_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "balance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" RENAME COLUMN "balance" TO "amount"`);
    }

}
