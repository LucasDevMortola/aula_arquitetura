import { GetOneProjectController } from './../../../projects/presentation/controllers/get-one-project.controller';
import { GetAllImpedimentsController } from './../controller/get-all-impediments.controller';
import { Router } from "express";
import CreateImpedimentController from "../controller/create-impediment.controller";
import GetOneImpedimentController from '../controller/get-one-impediment.controller';



export default class ImpedimentRoutes {
    public init(): Router {
      const routes = Router();
  
      routes.post("/impediments", new CreateImpedimentController().handle);
      routes.get("/impediments", new GetAllImpedimentsController().handle);
      routes.get("/impediments/:uid",new GetOneImpedimentController().handle);
      
      return routes;
    }
  }