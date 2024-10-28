import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/business-cards-web2024'),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
