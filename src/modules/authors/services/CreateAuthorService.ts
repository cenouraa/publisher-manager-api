import { getCustomRepository } from "typeorm"
import Author from "../typeorm/entities/Author"
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository"
import AppError from "@shared/errors/AppError"

interface IRequest{
    name: string
    email: string
    institution: string
    orcid: string
    research_area: string
}

export default class CreateAuthorService{
    public async execute({name, email, institution, orcid, research_area}: IRequest): Promise<Author>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const emailExists = await authorsRepository.findByEmail(email)
        if(emailExists){
            throw new AppError('Email address already used.')
        }
        const normalizedOrcid = orcid.toUpperCase()
        const orcidExists = await authorsRepository.findByOrcid(normalizedOrcid)
        if(orcidExists){
            throw new AppError('ORCID identifier already used.')
        }
        const author = authorsRepository.create({name, email, institution, orcid: normalizedOrcid, research_area})
        await authorsRepository.save(author)
        return author 
    }
}