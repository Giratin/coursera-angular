import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  @Input() dish: Dish;

  commentForm: FormGroup;

  formsError = {
    'author': '',
    'comment': ''
  };

  validationMessage = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }

  dishcopy: Dish;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL
  ) { }

  ngOnInit() {
    this.createForm();
    this.dishservice.getDishIds().subscribe(
      (dishIds) => {
        this.dishIds = dishIds
      },
      (errmess) => {
        this.errMess = <any>errmess
      }
    );
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { 
        this.dish = dish; 
        this.dishcopy = dish; 
        this.setPrevNext(dish.id); 
      },
      (err)=>{
         this.errMess = <any>err
      }
      );
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['5', [Validators.required]],
      comment: ['', [Validators.required]]
    })

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formsError) {
      if (this.formsError.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formsError[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formsError[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    let comment = new Comment();
    comment = this.commentForm.value;
    comment.date = new Date().toISOString();
    this.dish.comments.push(comment);
    this.dishcopy.comments.push(comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.createForm();
  }




  formatLabel(value: number) {
    return value;
  }
}
