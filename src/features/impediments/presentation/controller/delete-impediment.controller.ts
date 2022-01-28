import { ImpedimentEntity } from './../../../../core/infra/data/database/entities/impediments';
import { ImpedimentRepository } from './../../infra/repositories/impediments.repository';
import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from '../../../../core/presentation/helpers/http-helper';
import { CacheRepository } from '../../../../core/infra/repositories/cache.repository';

 export default class DeleteImpedimentController implements Controller{
    async handle(req: Request,res: Response): Promise<any>{
         try {
            const {uid} = req.params

            const repository = new ImpedimentRepository()
            const cache = new CacheRepository();

            const impedimentEntity = repository.deleteImpedimentByUid(uid)

            cache.delete("impediments")
            
            ok(res,impedimentEntity)

         } catch (error) {
             serverError(res, error as any)
         }
        
     }

}