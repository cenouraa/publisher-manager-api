import { NextFunction, Request, Response } from "express";
import ListAuthorsService from "../services/ListAuthorsService";
import CreateAuthorService from "../services/CreateAuthorService";
import ShowAuthorService from "../services/ShowAuthorService";
import UpdateAuthorService from "../services/UpdateAuthorService";
import DeleteAuthorService from "../services/DeleteAuthorService";

export default class AuthorsController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listAuthors = new ListAuthorsService()
            const authors = await listAuthors.execute()
            return response.json(authors)
        } catch(err) {
            next(err)
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const showAuthor = new ShowAuthorService()
            const author = await showAuthor.execute({id})
            return response.json(author)
        } catch(err) {
            next(err)
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const createAuthor = new CreateAuthorService()
            const {name, email, institution, orcid, research_area} = request.body
            const author = await createAuthor.execute({name, email, institution, orcid, research_area})
            return response.json(author)
        } catch(err) {
            next(err)
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const {name, email, institution, orcid, research_area} = request.body
            const createAuthor = new UpdateAuthorService()
            const author = await createAuthor.execute({id, name, email, institution, orcid, research_area})
            return response.json(author)
        } catch(err) {
            next(err)
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params
            const deleteAuthor = new DeleteAuthorService()
            await deleteAuthor.execute({id})
            return response.json([])
        } catch(err) {
            next(err)
        }
    }


}