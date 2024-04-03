import { Injectable } from '@nestjs/common';
import { Food } from './food.model';

@Injectable()
export class FoodsService {
    private idCounter = 11;
    private foods: Food[] = [
        { id: 1, description: 'Apple', kcal: 52, protein: 0.3, fat: 0.2, carbs: 14 },
        { id: 2, description: 'Banana', kcal: 89, protein: 1.1, fat: 0.3, carbs: 23 },
        { id: 3, description: 'Broccoli', kcal: 34, protein: 2.8, fat: 0.4, carbs: 6.6 },
        { id: 4, description: 'Chicken Breast', kcal: 165, protein: 31, fat: 3.6, carbs: 0 },
        { id: 5, description: 'Eggs', kcal: 155, protein: 13, fat: 11, carbs: 1.1 },
        { id: 6, description: 'Almonds', kcal: 579, protein: 21, fat: 50, carbs: 22 },
        { id: 7, description: 'Oats', kcal: 389, protein: 16.9, fat: 6.9, carbs: 66 },
        { id: 8, description: 'Sweet Potato', kcal: 86, protein: 1.6, fat: 0.1, carbs: 20 },
        { id: 9, description: 'Salmon', kcal: 208, protein: 20, fat: 13, carbs: 0 },
        { id: 10, description: 'Rice', kcal: 130, protein: 2.7, fat: 0.3, carbs: 28 }
    ];

    findAll(): Food[] {
        return this.foods;
    }

    add(food: Omit<Food, 'id'>): Food {
        const newFood = { id: this.idCounter++, ...food };
        this.foods.push(newFood);
        return newFood;
    }

}
