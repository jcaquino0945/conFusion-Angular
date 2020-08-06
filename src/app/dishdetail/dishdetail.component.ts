import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('comForm') commentFormDirective;
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    commentForm: FormGroup;
    comment: Comment;
    //dishes: Dish[] = DISHES;

  
    
    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private cm: FormBuilder) {
        this.createForm();
       }
  
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }
    commentFormErrors = {
      'author': '',
      'comment': ''
    };
    validationMessages = {
      'author': {
        'required':      'Author Name is required.',
        'minlength':     'Author Name must be at least 2 characters long.',
        'maxlength':     'Author Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required': 'Comment is required'
      }
    };
    getDate() {
      var d = new Date();
  var n = d.toISOString();
  return n;
    }
    createForm() {
      this.commentForm = this.cm.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: 5,
        comment: ['', Validators.required],
        date:this.getDate()
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged();
    }
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.commentFormErrors) {
        if (this.commentFormErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.commentFormErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.commentFormErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
}
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
    goBack(): void {
      this.location.back();
    }
    
onSubmit() {
  this.comment= this.commentForm.value;
  console.log(this.comment);
  this.dish.comments.push(this.comment)
  this.commentForm.reset({
    author:'',
    rating:5,
    comment:'',
    date: this.getDate()
  });
  //this.commentFormDirective.resetForm(); this shit restarts the form so date will be gone
}
}
