import {MigrationInterface, QueryRunner} from "typeorm";

export class editLaonRequest1687677420724 implements MigrationInterface {
    name = 'editLaonRequest1687677420724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "loan-requests" ALTER COLUMN "request_status" SET DEFAULT 'PENDING'-requests_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
    }

}
