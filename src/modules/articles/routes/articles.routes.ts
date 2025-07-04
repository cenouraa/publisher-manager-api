import { Router } from "express"
import ArticlesController from "../controllers/ArticlesController"
import { celebrate, Joi, Segments } from "celebrate"
import { ArticleStatus } from "../typeorm/entities/Article"
import isAuthenticated from "@shared/http/middlewares/isAuthenticated"

const articlesRouter = Router()
const articlesController = new ArticlesController()

const validStatus = Object.values(ArticleStatus)

articlesRouter.get('/', isAuthenticated, async(req, res, next) => {
    try{
        await articlesController.index(req, res, next)
    } catch(err) {
        next(err)
    }
})

articlesRouter.get('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
    async(req, res, next) => {
        try{
            await articlesController.show(req, res, next)
        } catch(err) {
            next(err)
        }
})

articlesRouter.get('/author/:author_id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {author_id: Joi.string().uuid().required()}
}),
    async(req, res, next) => {
        try{
            await articlesController.list(req, res, next)
        } catch(err) {
            next(err)
        }
})

articlesRouter.post('/', isAuthenticated, celebrate({
    [Segments.BODY]: {
        title: Joi.string().min(5).max(100).required(),
        knowledge_area: Joi.string().required(),
        abstract: Joi.string().min(30).max(500).required(),
        key_words: Joi.string().required(),
        submission_date: Joi.date().max('now'),
        status: Joi.string().valid(...Object.values(validStatus).map(s => s.toString())).required(),
        author_id: Joi.string().uuid().required()
    }
}),
    async(req, res, next) => {
        try{
            await articlesController.create(req, res, next)
        } catch(err) {
            next(err)
        }
})

articlesRouter.put('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        title: Joi.string().min(5).max(100).required(),
        knowledge_area: Joi.string().required(),
        abstract: Joi.string().min(30).max(500).required(),
        key_words: Joi.string().required(),
        submission_date: Joi.date().max('now'),
        status: Joi.string().valid(...Object.values(validStatus).map(s => s.toString())).required(),
        author_id: Joi.string().uuid()
    }
}),
    async(req, res, next) => {
        try{
            await articlesController.update(req, res, next)
        } catch(err) {
            next(err)
        }
})

articlesRouter.delete('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
    async(req, res, next) => {
        try{
            await articlesController.delete(req, res, next)
        } catch(err) {
            next(err)
        }
})

export default articlesRouter