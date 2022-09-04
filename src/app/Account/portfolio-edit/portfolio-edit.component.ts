import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {PortfolioService} from '../../Portfolios/portfolio.service';
import {ConfirmationService, MenuItem, Message, MessageService} from 'primeng/api';
import {User} from '../../user';
import {Portfolio} from '../account-portfolios/account-portfolios.component';
import {DialogService} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {SafeUrl} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';
import {CalculatorService} from '../../calculator.service';
import {ProfileService} from '../../Profiles/profile/profile.service';

export class Image {
  constructor(
    public id: number = 0,
    public portfolio: Portfolio,
    public file_url: string,
    public name: string,
    public addedDate: Date
  ) {}
}

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class PortfolioEditComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  portfolioId: number;
  msgs: Message[] = [];
  imageUrl?: SafeUrl;
  user: User;
  portfolio: Portfolio;
  images: Image[] = [];
  spin = false;
  photoDialog: boolean;
  editDialog: boolean;
  uploadedFiles: any[] = [];
  albumForm: FormGroup;
  responsiveOptions: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private portfolioService: PortfolioService,
              private profileService: ProfileService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private sanitizer: DomSanitizer,
              private confirmationService: ConfirmationService,
              public calculatorService: CalculatorService
  ) {
    this.albumForm = formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: formBuilder.control('', [
        Validators.required
      ])
    }, {});
  }

ngOnInit() {
    this.authenticationService.currentUser.subscribe(user =>
      this.user = user
    );
    this.route.paramMap.subscribe(params => {
      this.portfolioId = +this.route.snapshot.paramMap.get('id');
      this.portfolioService.findById(this.portfolioId).subscribe(portfolio => {
        this.portfolio = portfolio;
      });
      this.portfolioService.getImagesByPortfolio(this.portfolioId).subscribe(images => {
        this.images = images.map((image) => {
          return { id: image.id, portfolio: image.portfolio,
          file_url: image.file_url,
          name: image.name, added_date: this.calculatorService.getDate(image.added_date)};
   });
      });
    });
    this.items = [
      {label: 'Konto'},
      {label: 'Albumy'},
      {label: 'Edycja'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  editPortfolio(): void {
    this.editDialog = true;
  }

  addPhotoDialog() {
    this.photoDialog = true;
  }

  async myUploader(event) {
    for (let file of event.files) {
      console.log('FILE TO BE UPLOADED: ');
      console.log(event);
      const url = window.URL.createObjectURL(file);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);

      this.portfolioService.addImage(
        this.portfolioId,
        this.imageUrl,
        file.name
      ).subscribe(user => {
        this.spin = false;
        window.location.reload();
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Image Submitted'});
      }, _ => {
        this.spin = false;
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'});
      });
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  save(): void {
    console.log('Save BE UPLOADED: ');
    this.photoDialog = false;
    for (const file of this.uploadedFiles) {
    }
    this.uploadedFiles = [];
    window.location.reload();
  }

  updatePortfolio(): void {
    this.editDialog = false;
    this.spin = true;
    const controls = this.albumForm.controls;
    this.portfolioService.editPortfolio(
      this.portfolioId,
      controls.name.value === '' ? this.portfolio.name : controls.name.value,
      controls.description.value === '' ? this.portfolio.description : controls.description.value
    ).subscribe(user => {
      this.spin = false;
      window.location.reload();
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'});
    });
  }

  updatePortfolioSetMain(image): void {
    this.editDialog = false;
    this.spin = true;
    const controls = this.albumForm.controls;
    this.portfolioService.setMainPhotoUrl(
      this.portfolioId,
      image.file_url
    ).subscribe(user => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Zdjęcie głowne zostało ustawione'});
      window.location.reload();
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Błąd', detail: ''});
    });
  }

  updateUserSetMain(image): void {
    this.editDialog = false;
    this.spin = true;
    const controls = this.albumForm.controls;
    this.profileService.addMainPhotoUrl(
      this.user.email,
      image.file_url
    ).subscribe(user => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Zdjęcie głowne zostało ustawione'});
      this.authenticationService.getUserData(this.user.token).subscribe(ur => {
        this.authenticationService.storeUser(ur);
      });
      window.location.reload();
    }, _ => {
      this.spin = false;
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error'});
    });
  }

  deleteImage(image): void {
    this.portfolioService.deleteById(image.id).subscribe(() => {
          this.msgs = [];
          this.msgs.push({severity: 'info', summary: 'Sukces', detail: 'Obraz został usunięty'});
        }, _ => {
          this.msgs = [{severity: 'info', summary: 'Błąd', detail: ''}];
        });
    window.location.reload();
  }
}
