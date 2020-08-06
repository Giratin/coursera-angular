import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;
   
  constructor(
    private dishService: DishService,
    @Inject('BaseURL') private baseURL,
    ) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => {
      this.dishes = dishes.map((dish : Dish)=>{
        dish.image = this.baseURL + dish.image;
        return dish;
      })
    });

    console.log(this.baseURL)
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
