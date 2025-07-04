import Article from "@modules/articles/typeorm/entities/Article";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('authors')
export default class Author{
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string
    @Column()
    email: string
    @Column()
    institution: string
    @Column()
    orcid: string
    @Column()
    research_area: string
    @Column()
    avatar: string

    @OneToMany(() => Article, (article) => article.author)
    articles: Article[]

    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}