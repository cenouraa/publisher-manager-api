import Author from "@modules/authors/typeorm/entities/Author";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ArticleStatus{
    DRAFT = 'draft',
    UNDER_REVIEW = 'under_review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PUBLISHED = 'published'
}

@Entity('articles')
export default class Article{
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    title: string
    @Column()
    knowledge_area: string
    @Column()
    abstract: string
    @Column()
    key_words: string
    @Column()
    submission_date: Date
    @Column()
    status: ArticleStatus

    @ManyToOne(() => Author, (author) => author.articles)
    @JoinColumn({ name: 'author_id' }) 
    author: Author

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}