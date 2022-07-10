import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {PortfolioService} from '../../Portfolios/portfolio/portfolio.service';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {User} from '../../user';
import {Portfolio} from '../account-portfolios/account-portfolios.component';
import {DialogService} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {SafeUrl} from '@angular/platform-browser';
import {DomSanitizer} from '@angular/platform-browser';

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
  providers: [DialogService, MessageService]
})
export class PortfolioEditComponent implements OnInit {

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
              private authService: AuthenticationService,
              private portfolioService: PortfolioService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private sanitizer: DomSanitizer
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
    this.route.paramMap.subscribe(params => {
      this.portfolioId = +this.route.snapshot.paramMap.get('id');
      this.portfolioService.findById(this.portfolioId).subscribe(portfolio => {
        this.portfolio = portfolio;
      });
      this.portfolioService.getImagesByPortfolio(this.portfolioId).subscribe(images => {
        this.images = images;
      });
    });
  }

  getDate(date): Date {
    return date.slice(0, 10);
  }

  editPortfolio(): void {
    this.editDialog = true;
  }

  addPhotoDialog() {
    this.photoDialog = true;
  }

  myUploader(event) {
    for ( let file of event.files) {
      console.log('FILE TO BE UPLOADED: ');

      const url = URL.createObjectURL(file);
      console.log(url);
      //this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.imageUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
      console.log(this.imageUrl);
      console.log(file.name);
      this.uploadedFiles.push(file);

      const formData: FormData = new FormData();
      formData.append('portfolio', this.portfolioId.toString());
      formData.append('file_url', url);
      formData.append('name', file.name);
      console.log(formData);
      console.log(formData.get('name'));
      this.portfolioService.addImage(formData).subscribe(image => {
        this.spin = true;
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

      console.log('file Save BE UPLOADED: ');
      this.portfolioService.addImage(this.portfolioId).subscribe(image => {
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
}
