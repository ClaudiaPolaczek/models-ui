import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../Account/account-user/account.service';
import {ProfileService} from '../profile/profile.service';
import {AuthenticationService} from '../../authentication.service';
import {NGXLogger} from 'ngx-logger';
import {CalculatorService} from '../../calculator.service';
import {Comment} from '../model-profile/model-profile.component';
import {MenuItem, Message} from 'primeng/api';
import {Survey, UserDatails} from '../../Account/account-user/account.component';
import {User} from '../../user';

@Component({
  selector: 'app-photographer-profile',
  templateUrl: './photographer-profile.component.html',
  styleUrls: ['./photographer-profile.component.css']
})
export class PhotographerProfileComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  comments: Comment[];
  commentForm: FormGroup;
  msgs: Message[] = [];
  photographerId = 0;
  userDetail: UserDatails;
  survey: Survey;
  user: User;
  currentUser: User;
  loading = true;
  newComment: boolean;
  rating = 3;
  email: string;
  tabUrl = 'https://www.instagram.com/';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public router: Router,
              private accountService: AccountService,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              public calculatorService: CalculatorService) {
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

  ngOnInit() {
    this.authService.currentUser.subscribe(user =>
      this.currentUser = user
    );
    this.route.paramMap.subscribe(params => {
      this.photographerId = +this.route.snapshot.paramMap.get('id');
    });
    this.profileService.findPhotographerById(this.photographerId).subscribe(photographer => {
      this.user = photographer.user;
      this.userDetail = photographer;
      this.survey = photographer.survey;
      this.tabUrl = this.tabUrl.concat(this.survey.instagram_name);
      this.accountService.getCommentsByRatedUser(this.user.email).subscribe(comments => {
        this.comments = comments.map((comment) => {
          return {
            id: comment.id, rating_user_id: comment.rating_user.id, rating_user_username: comment.rating_user.email,
            rated_user_id: comment.rating_user.id, rating: comment.rating,
            date: this.calculatorService.getDate(comment.added_date), content: comment.content
          };
        });
      });
      this.loading = false;
    });

    this.items = [
      {label: 'Profile'},
      {label: this.survey.first_name + ' ' + this.survey.last_name},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  addNewComment(): void {
    this.newComment = true;
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
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Komentarz dodany'});
    }, _ => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd'});
    });
  }

  getComments(): void {
    this.accountService.getCommentsByRatedUser(1).subscribe(comments => {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Komentarz dodany'});
    }, _ => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Błąd'});
    });
  }

  deleteComment(id): void {
    this.accountService.deleteComment(id).subscribe(comments => {
      this.msgs = [];
      window.location.reload();
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Komentarz usunięty'});
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

  ifHasInstagram(): boolean {
    if (this.survey.instagram_name !== '') {
      return true;
    } else {
      return false;
    }
  }

  goToInstagram(): void {
    window.open(this.tabUrl);
  }

}
