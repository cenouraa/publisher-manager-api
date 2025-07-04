import { getCustomRepository, ILike } from "typeorm";
import Article from "../typeorm/entities/Article";
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string
}

export default class ShowArticleService{
    public async execute({id}: IRequest): Promise<Article> {
        const articlesRepository = getCustomRepository(ArticlesRepository)
        const article = await articlesRepository.findOne(id)
        if(!article){
            throw new AppError('Article not found')
        }
        return article
    }
}