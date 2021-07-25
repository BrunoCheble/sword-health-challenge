import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateTask1627170516904 implements MigrationInterface {
   
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'tasks',
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
                name: 'summary',
                length: '2500',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'technician_id',
                isNullable: false,
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
        await queryRunner.dropTable('tasks');
    }
}
