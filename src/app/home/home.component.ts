import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promotionErrorMsg: string;
  leaderErrorMsg: string;

  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService : LeaderService,
    @Inject('BaseURL') public baseURL
    ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish)=>{
      this.dish = dish
    },
    (err)=>{
      this.dishErrMess = <any>err
    });

    this.promotionservice.getFeaturedPromotion().subscribe(
      promotion =>{
        this.promotion = promotion
      } ,
      promErr => {
        this.promotionErrorMsg = <any>promErr;
    });

    this.leaderService.getFeatured().subscribe(
    (leader)=>{
      this.leader = leader
    },
    (err)=>{
      this.leaderErrorMsg = <any>err;
    }
    )
  }

}
