import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskMigration1750919043572 implements MigrationInterface {
    name = 'TaskMigration1750919043572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_framework_enum" AS ENUM('DSALTA', 'DSALTA-1', 'DSALTA-2')`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_category_enum" AS ENUM('MONITORING', 'ACCESS_CONTROL', 'MAINTENANCE', 'SECURITY_AUDIT')`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "framework" "public"."tasks_framework_enum" NOT NULL, "category" "public"."tasks_category_enum" NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'OPEN', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_framework_enum"`);
    }

}
