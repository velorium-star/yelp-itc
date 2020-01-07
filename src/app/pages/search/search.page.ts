import { Component, ViewChild, OnInit } from "@angular/core";
import { FormBuilder, Form, FormGroup, Validators, FormGroupDirective } from "@angular/forms";
import { IonInfiniteScroll, ModalController, IonVirtualScroll } from "@ionic/angular";
import { YelpService } from "../../services/yelp.service";
import { Router } from "@angular/router";
import { LocationSettingsComponent } from "src/app/dialogs/location-settings/location-settings.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "search.page.html",
  styleUrls: ["search.page.scss"]
})
export class SearchPage implements OnInit {
  @ViewChild("formRef", { static: false }) formRef: FormGroupDirective;
  @ViewChild(IonVirtualScroll, { static: false }) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  searchForm: FormGroup;
  loading = false;
  showSkeleton = false;
  searchResults = [];
  currentPage = 0;
  searchBusinesses$: Subscription;

  validationMessages = {
    query: [
      { type: "maxlength", message: "Query is too long." },
      { type: "pattern", message: "Query contains forbidden characters." }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private yelpService: YelpService,
    public modalController: ModalController,
    public router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.setFormListeners();
  }

  async search(event: any) {
    if (this.searchForm.valid) {
      this.currentPage = 0;

      this.loading = true;
      this.showSkeleton = true;

      //Cancel ongoing HTTP requests if user types slowly
      if (this.searchBusinesses$) {
        this.searchBusinesses$.unsubscribe();
      }

      this.searchBusinesses$ = this.yelpService
        .searchBusinesses(this.searchForm.getRawValue().query, this.currentPage)
        .subscribe((x: any) => {
          this.searchResults = x.businesses;
          this.loading = false;

          setTimeout(() => {
            this.showSkeleton = false;
          }, 750);
        });
    }
  }

  async loadMore(event: any) {
    if (this.searchForm.valid) {
      this.currentPage++;

      this.loading = true;

      this.yelpService.searchBusinesses(this.searchForm.getRawValue().query, this.currentPage).subscribe((x: any) => {
        if (!x.businesses.length) {
          this.infiniteScroll.disabled = true;
        }
        this.searchResults.push(...x.businesses);
        event.target.complete();
        this.virtualScroll.checkEnd();
        this.loading = false;
      });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LocationSettingsComponent,
      componentProps: {
        modalRef: this.modalController
      }
    });

    return await modal.present();
  }

  setFormListeners() {
    this.searchForm.get("query").valueChanges.subscribe(query => {
      if (!query || !query.length) {
        this.searchResults = [];
        this.infiniteScroll.disabled = true;
      } else {
        this.infiniteScroll.disabled = false;
      }
    });
  }

  viewDetails(id) {
    this.router.navigateByUrl(`/details/${id}`);
  }

  clear() {
    this.searchForm.controls["query"].setValue("");
    this.searchForm.markAsPristine();
    this.searchResults = [];
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      query: [
        "",
        Validators.compose([Validators.maxLength(30), Validators.pattern("[a-zA-Z0-9 ]*"), Validators.required])
      ]
    });
  }
}
