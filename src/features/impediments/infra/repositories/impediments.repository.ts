import { Impediments } from './../../domain/model/impediments';
import { ImpedimentEntity } from './../../../../core/infra/data/database/entities/impediments';


interface CreateImpedimentParams {
    title: string,
    description: string,
    uid_project: string
}


export class ImpedimentRepository{


    async create (data: CreateImpedimentParams): Promise<Impediments>{

        const impedimentEntity = ImpedimentEntity.create({
            title: data.title,
            description: data.description,
            resolve: false,
            uid_project: data.uid_project
        })

       await impedimentEntity.save()

        return {
            uid: impedimentEntity.uid,
            title: impedimentEntity.title,
            description: impedimentEntity.description,
            resolve: impedimentEntity.resolve,
            create_at: impedimentEntity.create_at,
            update_at: impedimentEntity.update_at
        } 
    }

   

    async getAllImpediments(): Promise<Impediments[]>{

        const impedimentsEntity = await ImpedimentEntity.find()

        // const array: Impediments = impedimentsEntity.map((impediment)=>{
        //     uid: impediment.uid,
        //     title: impediment.title,
        //     description: impediment.description,
        //     resolve: impediment.resolve,
        //     create_at: impediment.create_at,
        //     update_at: impediment.update_at
        // })

        return impedimentsEntity.map((impedimentsEntity) => 
        this.mapperFromEntityToModel(impedimentsEntity)
    );
    }

    async getImpedimentByUid(uid:string): Promise<Impediments | undefined>{

        const impedimentEntity = await ImpedimentEntity.findOne(uid)

        if(!impedimentEntity) return undefined

        return this.mapperFromEntityToModel(impedimentEntity) 
    }

    async deleteImpedimentByUid(uid:string): Promise<Impediments | undefined>{

        const impedimentEntity = await ImpedimentEntity.findOne(uid)

        if(!impedimentEntity) return undefined

         await impedimentEntity.remove()

        return {
            uid: impedimentEntity.uid,
            description: impedimentEntity.description,
            resolve: impedimentEntity.resolve,
            title: impedimentEntity.title
        }
    }
    private mapperFromEntityToModel(entity: ImpedimentEntity): Impediments {
        return {
            uid: entity.uid,
            title: entity.title,
            description: entity.description,
            resolve: entity.resolve,
            create_at: entity.create_at,
            update_at: entity.update_at
        };
    }

}