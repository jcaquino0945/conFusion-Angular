import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  //dishes = DISHES;
  //selectedDish = DISHES[0];
  dishes: Dish[];
   constructor(private dishService: DishService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit(): void {
    //this.dishes = this.dishService.getDishes();
    //this.dishService.getDishes().then(dishes => this.dishes = dishes);
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

}
