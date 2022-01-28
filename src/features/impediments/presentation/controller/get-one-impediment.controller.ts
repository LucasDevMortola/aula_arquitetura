import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-helper";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";

export default class GetOneImpedimentController implements Controller{
   async handle(req: Request,res: Response): Promise<any> {
        try {
            const { uid } = req.params 
            
            const repository = new ImpedimentRepository()
            const cache = new  CacheRepository()

            const impediment: any = await repository.getImpedimentByUid(uid)
            const cacheImpediment = await cache.get(`impediment:${uid}`);


            if (cacheImpediment) {
                return ok(res, Object.assign({}, cacheImpediment, { _cache: true }));
              }

              await cache.set(`impediment:${impediment.uid} `, impediment);
            return ok(res,impediment)
            }
        catch (error) {
            console.log(error)
            serverError(res, error as any)
        }
    }

}