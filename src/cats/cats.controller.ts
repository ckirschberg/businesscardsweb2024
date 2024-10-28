import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    
    constructor(private catsService: CatsService) {}

    //@HttpCode(201)
    @Get()
    getCats(): string {
        return "We are the cats";
    }
    
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {        
      return await this.catsService.create(createCatDto);
    }

}
