import { getCustomRepository } from "typeorm"
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository"
import AppError from "@shared/errors/AppError"

interface IRequest{
    id: string
}

export default class DeleteArticleService{
    public async execute({id}: IRequest): Promise<void>{
        const articlesRepository = getCustomRepository(ArticlesRepository)
        const article = await articlesRepository.findOne(id)
        if(!article){
            throw new AppError('Article not found')
        }
        await articlesRepository.remove(article)
    }
}