import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, iif, of } from "rxjs";
import { switchMap, mergeMap, tap, map, catchError } from "rxjs/operators";
import { LocationService } from "./location.service";
import { NotificationService } from "./notification.service";

@Injectable()
export class YelpService {
  constructor(
    private httpClient: HttpClient,
    private locationService: LocationService,
    private notificationService: NotificationService
  ) {}

  public searchBusinesses(term, currentPage, limit = 24): Observable<any> {
    return this.locationService.loadLocationData().pipe(
      mergeMap(x => iif(() => x.option == 1, this.locationService.readGeoLocation(), of(x))),
      switchMap(x => {
        if ("coords" in x) {
          return this.httpClient
            .get(
              `/v3/businesses/search?term=${term}&offset=${currentPage * limit}&limit=${limit}&latitude=${
                x.coords.latitude
              }&longitude=${x.coords.longitude}`
            )
            .pipe(
              catchError(err => {
                this.notificationService.showError(`${err.status} - ${err.statusText}`);
                return of({ businesses: [] });
              })
            );
        } else {
          return this.httpClient
            .get(
              `/v3/businesses/search?term=${term}&offset=${currentPage * limit}&limit=${limit}&location=${x.location}`
            )
            .pipe(
              catchError(err => {
                this.notificationService.showError(`${err.status} - ${err.statusText}`);
                return of({ businesses: [] });
              })
            );
        }
      })
    );
  }

  public getBusinessDetails(id): Observable<any> {
    return this.httpClient.get(`/v3/businesses/${id}`).pipe(
      catchError(err => {
        this.notificationService.showError(`${err.status} - ${err.statusText}`);
        return of({ status: "NOT_FOUND" });
      })
    );
  }

  public getBusinessReviews(id): Observable<any> {
    return this.httpClient.get(`/v3/businesses/${id}/reviews`).pipe(
      map((x: any) => x.reviews),
      catchError(err => {
        this.notificationService.showError(`${err.status} - ${err.statusText}`);
        return of({ status: "NOT_FOUND" });
      })
    );
  }
}
