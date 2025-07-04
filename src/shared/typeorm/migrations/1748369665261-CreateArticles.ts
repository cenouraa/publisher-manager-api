import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticles1748369665261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'articles',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'title', type: 'varchar'},
                    {name: 'knowledge_area', type: 'varchar'},
                    {name: 'abstract', type: 'text'},
                    {name: 'key_words', type: 'varchar'},
                    {name: 'submission_date', type: 'date'},
                    {name: 'status', type: 'varchar'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('articles')
    }

}
