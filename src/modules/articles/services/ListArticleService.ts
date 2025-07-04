import { getCustomRepository } from "typeorm";
import Article from "../typeorm/entities/Article";
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository";

export default class ListArticleService{
    public async execute(): Promise<Article[]>{
        const articlesRepository = getCustomRepository(ArticlesRepository)
        const articles = await articlesRepository.find()
        return articles
    }
}