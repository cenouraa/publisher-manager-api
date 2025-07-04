import { getCustomRepository } from "typeorm"
import Author from "../typeorm/entities/Author"
import AuthorsRepository from "../typeorm/repositories/AuthorsRepository"
import AppError from "@shared/errors/AppError"

interface IRequest{
    id: string
    name: string
    email: string
    institution: string
    orcid: string
    research_area: string
}

export default class UpdateAuthorService{
    public async execute({id, name, email, institution, orcid, research_area}: IRequest): Promise<Author>{
        const authorsRepository = getCustomRepository(AuthorsRepository)
        const author = await authorsRepository.findById(id)
        if(!author){
            throw new AppError('Author not found.')
        }
        const authorExistsEmail = await authorsRepository.findByEmail(email)
        if(authorExistsEmail && email !== author.email){
            throw new AppError('There is already one author with this email.')
        }
        const normalizedOrcid = orcid.toUpperCase()
        const authorExistsOrcid = await authorsRepository.findByOrcid(normalizedOrcid)
        if(authorExistsOrcid && normalizedOrcid !== author.orcid.toUpperCase()){
            throw new AppError('There is already one author with this ORCID.')
        }
        author.name = name
        author.email = email
        author.institution = institution
        author.orcid = normalizedOrcid
        author.research_area = research_area
        await authorsRepository.save(author)
        return author
    }
}