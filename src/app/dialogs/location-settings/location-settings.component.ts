import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController, IonInput, LoadingController } from "@ionic/angular";
import { LocationService } from "src/app/services/location.service";
import { LocationDataModel } from "src/app/models/location-data.model";
import { tap, switchMap, catchError } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import { of } from "rxjs";

@Component({
  selector: "app-location-settings",
  templateUrl: "./location-settings.component.html",
  styleUrls: ["./location-settings.component.scss"]
})
export class LocationSettingsComponent implements OnInit {
  @Input() modalRef: ModalController;
  @ViewChild("input", { static: false }) locationInput: IonInput;

  validationMessages = {
    location: [{ type: "required", message: "Location can not be empty!" }]
  };

  data: LocationDataModel = { option: 0, location: null };
  searchForm: FormGroup;
  loadingOptions: {
    message: "Please wait...";
  };
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.buildForm();
    this.setFormValidators();
    this.getStoredData();
  }

  /* Revert to cached data and set focus to input */
  changedSelection(event: any) {
    if (event.target.value == 2 && this.locationInput) {
      this.searchForm.controls["location"].setValue(this.data.location);

      (function(input) {
        setTimeout(function() {
          input.setFocus();
        }, 400);
      })(this.locationInput);
    }
  }

  /* Update data logic */
  async update() {
    if (this.searchForm.valid) {
      const loading = await this.loadingController.create(this.loadingOptions);
      await loading.present();

      if (this.searchForm.value.option == 1) {
        this.locationService
          .readGeoLocation()
          .pipe(
            switchMap(x => {
              return this.locationService
                .saveLocationData({
                  option: 1,
                  location: null
                })
                .pipe(
                  tap(x => {
                    this.loadingController.dismiss();
                    this.notificationService.showSuccess("Successfully saved.");
                    this.modalRef.dismiss();
                  }),
                  catchError(err => {
                    this.loadingController.dismiss();
                    this.notificationService.showError("Unable to save!");

                    return of(err);
                  })
                );
            })
          )
          .subscribe();
      } else if (this.searchForm.value.option == 2) {
        this.locationService
          .saveLocationData({ option: 2, location: this.searchForm.value.location })
          .pipe(
            tap(x => {
              this.loadingController.dismiss();
              this.modalRef.dismiss();
              this.notificationService.showSuccess("Successfully saved.");
            }),
            catchError(err => {
              this.loadingController.dismiss();
              this.notificationService.showError("Unable to save!");

              return of(err);
            })
          )
          .subscribe();
      }
    }
  }

  async close() {
    await this.modalRef.dismiss();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      location: [null],
      option: [null]
    });
  }

  setFormValidators() {
    const locationControl = this.searchForm.get("location");

    this.searchForm.get("option").valueChanges.subscribe(option => {
      if (option == 2) {
        locationControl.setValidators(Validators.compose([Validators.required]));
      } else {
        locationControl.setValidators(null);
      }

      locationControl.updateValueAndValidity();
    });
  }

  getStoredData() {
    this.locationService
      .loadLocationData()
      .pipe(
        tap(x => {
          this.data = x;
          this.searchForm.patchValue(this.data);
          this.searchForm.markAsPristine();
        }),
        catchError(err => {
          this.loadingController.dismiss();
          this.notificationService.showError("Unable to get data!");

          return of(err);
        })
      )
      .subscribe();
  }
}
