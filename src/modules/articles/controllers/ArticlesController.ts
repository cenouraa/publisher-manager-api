import { NextFunction, Request, Response } from "express";
import ListArticleService from "../services/ListArticleService";
import ShowArticleService from "../services/ShowArticleService";
import CreateArticleService from "../services/CreateArticleService";
import UpdateArticleService from "../services/UpdateArticleService";
import DeleteArticleService from "../services/DeleteArticleService";
import ListArticlesByAuthorService from "../services/ListArticlesByAuthorService";

export default class ArticlesController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listArticles = new ListArticleService()
            const articles = await listArticles.execute()
            return response.json(articles)
        } catch(err) {
            next(err)
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const showArticle = new ShowArticleService()
            const article = await showArticle.execute({id})
            return response.json(article)
        } catch(err) {
            next(err)
        }
    }

    public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {author_id} = request.params
            const listArticle = new ListArticlesByAuthorService()
            const article = await listArticle.execute({author_id})
            return response.json(article)
        } catch(err) {
            next(err)
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {title, knowledge_area, abstract, key_words, submission_date, status, author_id} = request.body
            const createArticle = new CreateArticleService()
            const article = await createArticle.execute({title, knowledge_area, abstract, key_words, submission_date, status, author_id})
            return response.json(article)
        } catch(err) {
            next(err)
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const {title, knowledge_area, abstract, key_words, submission_date, status} = request.body
            const createArticle = new UpdateArticleService()
            const article = await createArticle.execute({id, title, knowledge_area, abstract, key_words, submission_date, status})
            return response.json(article)
        } catch(err) {
            next(err)
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const deleteArticle = new DeleteArticleService()
            await deleteArticle.execute({id})
            return response.json([])
        } catch(err) {
            next(err)
        }
    }
}