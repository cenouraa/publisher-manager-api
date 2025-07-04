import { EntityRepository, Repository } from "typeorm";
import Author from "../entities/Author";

@EntityRepository(Author)
export default class AuthorsRepository extends Repository<Author>{
    public async findByName(name: string): Promise<Author | undefined>{
        const author = await this.findOne({where:{name}})
        return author
    }

    public async findById(id: string): Promise<Author | undefined>{
        const author = await this.findOne({where: {id}})
        return author
    }

    public async findByEmail(email: string): Promise<Author | undefined>{
        const author = await this.findOne({where: {email}})
        return author
    }   

    public async findByOrcid(orcid: string): Promise<Author | undefined>{
        const normalizedOrcid = orcid.toUpperCase()
        const author = await this.findOne({where:{orcid: normalizedOrcid}})
        return author
    }
}