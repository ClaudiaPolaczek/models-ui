import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {AccountService} from '../../Account/account-user/account.service';
import {Message, MessageService} from 'primeng/api';
import {Portfolio} from '../../Account/account-portfolios/account-portfolios.component';
import {DialogService} from 'primeng/dynamicdialog';
import {PortfolioService} from '../../Portfolios/portfolio/portfolio.service';
import {Model} from '../model-profiles/model-profiles.component';
import {User} from '../../user';
import {Survey, UserDatails} from '../../Account/account-user/account.component';


export interface Comment {
  id?: number;
  rating_user_id?: number;
  rating_user_username?: string;
  rated_user_id?: number;
  rating?: number;
  date?: string;
  content?: string;
}

@Component({
  selector: 'app-model-profile',
  templateUrl: './model-profile.component.html',
  styleUrls: ['./model-profile.component.css'],
  providers: [DialogService, MessageService],
})
export class ModelProfileComponent implements OnInit {

  msgs: Message[] = [];
  modelId = 0;
  comments: Comment[];
  user: User;
  currentUser: User;
  userDetails: UserDatails;
  survey: Survey;
  commentForm: FormGroup;
  loading = true;
  newComment: boolean;
  rating = 3;
  email: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private logger: NGXLogger) {
    this.commentForm = formBuilder.group({
      description: formBuilder.control('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      rating: formBuilder.control('', [
        Validators.required
      ])
    }, {});
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user =>
      this.currentUser = user
    );
    this.route.paramMap.subscribe(params => {
      this.modelId = +this.route.snapshot.paramMap.get('id');
    });
    this.profileService.findModelById(this.modelId).subscribe(model => {
      this.userDetails = model;
      this.survey = model.survey;
      this.user = model.user;
      this.accountService.getCommentsByRatedUser(this.user.email).subscribe(comments => {
        this.comments = comments.map((comment) => {
          return { id: comment.id, rating_user_id: comment.rating_user.id, rating_user_username: comment.rating_user.email,
            rated_user_id: comment.rating_user.id, rating: comment.rating,
            date: this.getDate(comment.added_date), content: comment.content};
        });
        this.loading = false;
      });
    });
  }

  getGender(gender: string) {
    if (gender === 'M') {
      return 'Mężczyzna';
    } else if (gender === 'K') {
      return 'Kobieta';
    }
  }

  addNewComment(): void {
    this.newComment = true;
  }

  getDate(date): Date {
    return date.slice(0, 10);
  }

  addComment(): void {
    this.newComment = false;
    const controls = this.commentForm.controls;
    console.log(controls.description);
    console.log(this.rating);
    this.accountService.addComment(this.currentUser.id, this.user.id, this.rating, controls.description.value
    ).subscribe(comment => {
      window.location.reload();
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Komentarz dodany'});
    }, _ => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd'});
    });
  }

  getComments(): void {
    this.accountService.getCommentsByRatedUser(1).subscribe(comments => {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Komentarz dodany'});
    }, _ => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd'});
    });
  }

  deleteComment(id): void {
    this.accountService.deleteComment(id).subscribe(comments => {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Komentarz usunięty'});
    }, _ => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd'});
    });
  }

  deleteCommentPossible(id) {
    if (this.currentUser.id === id) {
      return true;
    } else {
      return false;
    }
  }

  getAge(year): number {
    const date = new Date();
    return  date.getFullYear() - year;
  }

  goToInstagram(tabUrl): void {
    window.open(tabUrl);
  }

  getRatingUser(id): string {
    this.profileService.findUserById(id).subscribe(user => {
      return user.username;
    });
    return '';
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
  }) {
    this.rating = $event.newValue;
  }

  addCommentPossible(id: number) {
    if (this.currentUser.id === id) {
      return false;
    } else {
      return true;
    }
  }
}
