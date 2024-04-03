import { Body, Controller, Get, Post } from '@nestjs/common';
import { Food } from './food.model';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
    constructor(private readonly foodsService: FoodsService) { }

    @Get()
    findAll(): Food[] {
        return this.foodsService.findAll();
    }

    @Post()
    add(@Body() food: Omit<Food, 'id'>) {
        return this.foodsService.add(food);
    }
}
