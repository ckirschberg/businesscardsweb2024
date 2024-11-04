import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { TestGuard } from '../auth/test.guard';

@Controller('cats')
export class CatsController {
    
    constructor(private catsService: CatsService) {}

    //@HttpCode(201)
    @Get()
    getCats(): string {
        return "We are the cats";
    }
    
    @Post()
    @UseGuards(TestGuard)
    async create(@Body() createCatDto: CreateCatDto) {        
      return await this.catsService.create(createCatDto);
    }

}
