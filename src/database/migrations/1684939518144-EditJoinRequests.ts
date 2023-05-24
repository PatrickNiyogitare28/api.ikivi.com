import {MigrationInterface, QueryRunner} from "typeorm";

export class EditJoinRequests1684939518144 implements MigrationInterface {
    name = 'EditJoinRequests1684939518144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_690cff04b5e4bb477326640f17a"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_0038869f44cc48f2b31f1297695"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437"`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "join_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "group" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "user" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-24T14:45:26.177Z"'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-24T14:45:26.177Z"'`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_690cff04b5e4bb477326640f17a" FOREIGN KEY ("join_code") REFERENCES "join-codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_0038869f44cc48f2b31f1297695" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_0038869f44cc48f2b31f1297695"`);
        await queryRunner.query(`ALTER TABLE "join-requests" DROP CONSTRAINT "FK_690cff04b5e4bb477326640f17a"`);
        await queryRunner.query(`ALTER TABLE "join-codes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'-codes_status_enum"`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-24 14:17:17.257'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-24 14:17:17.257'`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "user" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "group" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "join_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "join-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING'-requests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_ac7b552a266b87e58ebf86d9437" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_0038869f44cc48f2b31f1297695" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join-requests" ADD CONSTRAINT "FK_690cff04b5e4bb477326640f17a" FOREIGN KEY ("join_code") REFERENCES "join-codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
