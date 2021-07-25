import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateUser1627170507450 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: "int",
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: "increment"
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'manager_id',
                isNullable: true,
                type: 'int'
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              }
            ],
          }),
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
