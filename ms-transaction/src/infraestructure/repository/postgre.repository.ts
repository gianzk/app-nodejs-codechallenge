import {  Repository } from "typeorm";
import { TransactionEntity } from "src/domain/Transaction.entity";
import { TransactionRepository } from "src/domain/Transaction.repository";
import { TransactionModel } from "../model/transaction.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@nestjs/common";


export class PostgresRepository  implements TransactionRepository {
    private readonly logger = new Logger('postgress');
    constructor(@InjectRepository(TransactionModel) private trxRepository: Repository<TransactionModel>){

    }
    async registerTrx(trx:TransactionEntity):Promise<any>{
        
        this.logger.log(trx);
        const newTrx=this.trxRepository.create(trx);
        return this.trxRepository.save(newTrx);
    }
    async findTrx(id:number):Promise<any>{
        const res=await this.trxRepository.findOne({
           where:{
            id
           }
        });
        return res;
    }
}
