import { NextFunction, Request, Response } from "express";
import UpdateAuthorAvatarService from "../services/UpdateAuthorAvatarService";

export default class AuthorsAvatarController{
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const updateAvatar = new UpdateAuthorAvatarService()
            const author = await updateAvatar.execute({author_id: request.params.id, avatarFileName: request.file?.filename as string})
            return response.json(author)
        } catch(err) {
            next(err)
        }
    }
}