import { Router } from "express";
import AuthorsController from "../controllers/AuthorsController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import validateORCID from "@shared/http/middlewares/orcidValidator";
import AuthorsAvatarController from "../controllers/AuthorsAvatarController";
import multer from "multer";
import uploadConfig from "@config/upload";

const authorsRouter = Router()
const authorsController = new AuthorsController()
const authorsAvatarController = new AuthorsAvatarController()
const upload = multer(uploadConfig)

authorsRouter.use(isAuthenticated)

authorsRouter.get('/', async(req, res, next) => {
    try{
        await authorsController.index(req, res, next)
    } catch(err) {
        next(err)
    }
})

authorsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
    async(req, res, next) => {
        try{
            await authorsController.show(req, res, next)
        } catch(err) {
            next(err)
        }
})

authorsRouter.post('/', validateORCID, celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        institution: Joi.string().required(),
        orcid: Joi.string().required(), //validação sendo feita pelo middleware
        research_area: Joi.string().required()
    }
}),
    async(req, res, next) => {
        try{
            await authorsController.create(req, res, next)
        } catch(err) {
            next(err)
        }
})

authorsRouter.put('/:id', validateORCID, celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        institution: Joi.string().required(),
        orcid: Joi.string().required(), //validação sendo feita pelo middleware
        research_area: Joi.string().required()
    }
}),
    async(req, res, next) => {
        try{
            await authorsController.update(req, res, next)
        } catch(err) {
            next(err)
        }
})

authorsRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
    async(req, res, next) => {
        try{
            await authorsController.delete(req, res, next)
        } catch(err) {
            next(err)
        }
})

authorsRouter.patch('/avatar/:id',celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}), upload.single('avatar'),
async(req, res, next) => {
    try{
        await authorsAvatarController.update(req, res, next)
    } catch(err) {
        next(err)
    }
})

export default authorsRouter