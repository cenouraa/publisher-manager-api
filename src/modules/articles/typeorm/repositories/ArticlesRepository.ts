import { EntityRepository, Repository } from "typeorm";
import Article from "../entities/Article";

@EntityRepository(Article)
export default class ArticlesRepository extends Repository<Article>{
    public async findByTitleAndArea(title:string, knowledge_area:string) : Promise<Article | undefined>{
        const article = this.findOne({where:{title, knowledge_area}})
        return article
    }

    public async findByAuthor(author_id: string): Promise<Article[] | undefined>{
        const article = this.find({where:{author: { id: author_id }}})
        return article
    }
    
}