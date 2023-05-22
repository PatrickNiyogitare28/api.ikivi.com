import {MigrationInterface, QueryRunner} from "typeorm";

export class editGroup1684250607513 implements MigrationInterface {
    name = 'editGroup1684250607513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_bbd2a962ee50dde645224084108"`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "group_owner" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '"2023-05-16T15:23:34.755Z"'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '"2023-05-16T15:23:34.755Z"'`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_bbd2a962ee50dde645224084108" FOREIGN KEY ("group_owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_bbd2a962ee50dde645224084108"`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "updated_at" SET DEFAULT '2023-05-15 16:10:13.356'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT '2023-05-15 16:10:13.356'`);
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "group_owner" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_bbd2a962ee50dde645224084108" FOREIGN KEY ("group_owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
