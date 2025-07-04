import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddAuthorIdToArticles1750180016372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('articles',
            new TableColumn({
                name: 'author_id',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey('articles',
            new TableForeignKey({
                name: 'ArticlesAuthor',
                columnNames: ['author_id'],
                referencedTableName: 'authors',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('articles', 'ArticlesAuthor')
        await queryRunner.dropColumn('articles', 'author_id')
    }

}
