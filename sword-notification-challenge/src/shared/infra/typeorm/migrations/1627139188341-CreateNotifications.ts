import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNotifications1627139188341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'notifications',
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
                name: 'recipient_id',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'content',
                type: 'varchar',
              },
              {
                name: 'read',
                type: 'int',
                default: 0,
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              }
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notifications');
      }

}
