import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertUsers1627171701736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({ id: 1, name: 'Bruno 1', manager_id: null })
        .execute();

        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({ name: 'Bruno 1.1', manager_id: 1 })
        .execute();

        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({ name: 'Bruno  1.2', manager_id: 1 })
        .execute();

        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({ name: 'Eduardo 1', manager_id: null })
        .execute();

        queryRunner
        .manager
        .createQueryBuilder()
        .insert()
        .into("users")
        .values({ name: 'Eduardo 1.1', manager_id: 4 })
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
