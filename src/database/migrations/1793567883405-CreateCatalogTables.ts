import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCatalogTables1793567883405 implements MigrationInterface {
    name = 'CreateCatalogTables1793567883405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expansions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "english_name" character varying NOT NULL, "spanish_name" text, "release_date" date, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a6c3690db38e5d8404c35feb4a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "product_type" character varying NOT NULL, "expansion_id" uuid, "language" character varying, "units" integer, "description" text, "image_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expansionId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_990ae3da0f171c74c23f75d6fef" FOREIGN KEY ("expansionId") REFERENCES "expansions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_990ae3da0f171c74c23f75d6fef"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "expansions"`);
    }

}
