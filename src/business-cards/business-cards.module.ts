import { Module } from '@nestjs/common';
import { BusinessCardsService } from './business-cards.service';
import { BusinessCardsController } from './business-cards.controller';

@Module({
  controllers: [BusinessCardsController],
  providers: [BusinessCardsService],
})
export class BusinessCardsModule {}
