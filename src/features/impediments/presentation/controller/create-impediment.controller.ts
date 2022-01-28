import { Request, Response } from 'express';
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from '../../../../core/presentation/contracts/controller';
import { ok } from '../../../../core/presentation/helpers/http-helper';
import { ImpedimentRepository } from '../../infra/repositories/impediments.repository';



export default class CreateImpedimentController implements Controller{

   async handle(req: Request, res: Response): Promise<any> {
       try {
            
            const repository = new ImpedimentRepository()
            const cache = new CacheRepository();

            const impediment =  await repository.create(req.body);

            const result = await cache.set(`impediment:${impediment.uid}`, impediment);

            if (!result) console.log("NÃO SALVOU NO CACHE");
      
            // limpa a lista de registros do redis, pois o cache está desatualizado neste momento
            await cache.delete("impediments");
    
            return ok(res,impediment)

       } catch (error) {
            console.log(error)  
       }
    }

}