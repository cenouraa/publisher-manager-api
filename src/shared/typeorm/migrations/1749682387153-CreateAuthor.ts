import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAuthor1749682387153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'authors',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'name', type: 'varchar'},
                    {name: 'email', type: 'varchar', isUnique: true},
                    {name: 'institution', type:'varchar'},
                    {name: 'orcid', type: 'varchar', isNullable: true, isUnique: true},
                    {name: 'research_area', type:'varchar'},
                    {name: 'avatar', type: 'varchar', isNullable: true},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('authors')
    }

}
