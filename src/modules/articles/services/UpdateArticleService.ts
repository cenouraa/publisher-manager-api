import { getCustomRepository } from "typeorm"
import Article, { ArticleStatus } from "../typeorm/entities/Article"
import ArticlesRepository from "../typeorm/repositories/ArticlesRepository"
import AppError from "@shared/errors/AppError"

interface IRequest{
    id: string
    title: string
    knowledge_area: string
    abstract: string
    key_words: string
    status: ArticleStatus
}

export default class UpdateArticleService{
    public async execute({id, title, knowledge_area, abstract, key_words, status}: IRequest): Promise<Article>{
        const articlesRepository = getCustomRepository(ArticlesRepository)
        const article = await articlesRepository.findOne(id)
        if(!article){
            throw new AppError('Article not found', 404)
        }
        if(title !== article.title || knowledge_area !== article.knowledge_area) {
            const articleExists = await articlesRepository.findByTitleAndArea(title, knowledge_area)
            if(articleExists && articleExists.id !== article.id) {
                throw new AppError('There is already another article with this title in the specified knowledge area.', 409)
            }
        }
        article.title = title
        article.knowledge_area = knowledge_area
        article.abstract = abstract
        article.key_words = key_words
        article.submission_date = new Date()
        article.status = status
        await articlesRepository.save(article)
        return article
    }
}