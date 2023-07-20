import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from './logs.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/log.dto';

@Injectable()
export class LogsService {
    constructor(
        @InjectRepository(LogEntity)
        private readonly logRepository: Repository<LogEntity>,
        ){}

    public async saveLog(createLogDto: CreateLogDto){
        const newLog = await this.logRepository.save(createLogDto);
        return {
            success: true,
            data: newLog
        }
    }
}

   
