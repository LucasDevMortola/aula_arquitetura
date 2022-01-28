import { serverError } from './../../../../core/presentation/helpers/http-helper';
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok } from "../../../../core/presentation/helpers/http-helper";
import { ImpedimentRepository } from "../../infra/repositories/impediments.repository";
import { CacheRepository } from '../../../../core/infra/repositories/cache.repository';
import { Impediments } from '../../domain/model/impediments';


export class GetAllImpedimentsController implements Controller{

    async handle(req: Request, res: Response): Promise<any> {

       try {

         // cria uma instância do repositório do cache
      const cache = new CacheRepository();

      // busca os registro no cache
      const impedimentsCache = await cache.get("impediments");

      // verifica se tem registro, caso verdadeiro, retorna do cache
      if (impedimentsCache) {
        return ok(
          res,
          (impedimentsCache as Impediments[]).map((impediment) =>
            Object.assign({}, impediment, { _cache: true })
          )
        );
      }

        const repository = new ImpedimentRepository();

        const impediments = await repository.getAllImpediments()



        if (impediments.length === 0) return res.send(404);

        await cache.set("impediments", impediments);

        return ok(res,impediments)

       } catch (error:any) {
          return serverError(res,error)
       }       
    }
}