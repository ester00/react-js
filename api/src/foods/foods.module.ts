import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';

@Module({
  providers: [FoodsService],
  controllers: [FoodsController]
})
export class FoodsModule {}
