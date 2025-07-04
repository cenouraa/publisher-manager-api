import { getCustomRepository } from "typeorm"
import Article, { ArticleStatus } from "../typeorm/entities/Article"
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository"
import AppError from "@shared/errors/AppError"
import AuthorsRepository from "@modules/authors/typeorm/repositories/AuthorsRepository"

interface IRequest{
    title: string
    knowledge_area: string
    abstract: string
    key_words: string
    status: ArticleStatus
    author_id: string
}

export default class CreateArticleService{
    public async execute({title, knowledge_area, abstract, key_words, status, author_id}: IRequest) : Promise<Article>{
        const articlesRepository = getCustomRepository(ArticlesRepository)
        const authorsRepository = getCustomRepository(AuthorsRepository)

        const author = await authorsRepository.findById(author_id)
        if(!author){
            throw new AppError('Could not find any author with the given ids.')
        }

        const articleExists = await articlesRepository.findByTitleAndArea(title, knowledge_area)
        if(articleExists){
            throw new AppError('There is already another article with this title in the specified knowledge area.')
        }
        const article = articlesRepository.create({title, knowledge_area, abstract, key_words, submission_date: new Date(), status, author})
        await articlesRepository.save(article)
        return article
    }
}