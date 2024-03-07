import { Injectable , NotFoundException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { Repository } from 'typeorm';
import { TypeDto } from './dto/type.dto'

 
@Injectable()
export class TypeService {


	constructor(@InjectRepository(Type) private typeRepository: Repository<Type> ) {}

	async createType(type: TypeDto ){
		const typeFound = await this.typeRepository.findOne({
			where:{
				name: type.name
			}
		});

		if( typeFound ){
			return new InternalServerErrorException('Type already exists')
		}

		const newType = this.typeRepository.create(type);
	 
		return this.typeRepository.save(newType)
	}

	getTypes(){
		return this.typeRepository.find()
	}

	async getType(id: number){
		const typeFound = await this.typeRepository.findOne({
			where:{
				id: id
			}
		});

		if(!typeFound){
			return new NotFoundException('Type not found')
		}
		return typeFound;
	}

	deleteType(id: number){
		return this.typeRepository.delete({id});
	}

	updateType(id: number, type: TypeDto){
		return this.typeRepository.update({id: id}, type);
    }

}
