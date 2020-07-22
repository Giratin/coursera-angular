import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  /*
   getDishes(): Dish[] {
    return DISHES;
  }
  
  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }
  */

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string) : Leader {
    return LEADERS.filter((leader : Leader) => (leader.id === id))[0];
  }

  getFeatured(): Leader {
    return LEADERS.filter((leader : Leader) => (leader.featured === true))[0];
  }
}
