import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { from, Observable, Subject, Observer } from "rxjs";
import { LocationDataModel } from "../models/location-data.model";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor(private storage: Storage) {}

  loadLocationData(): Observable<LocationDataModel> {
    return from(
      this.storage.get("itc_location_option").then((res: LocationDataModel) => {
        if (!res) {
          return { option: 1, location: null, position: null };
        }
        return res;
      })
    );
  }

  saveLocationData(option: LocationDataModel) {
    return from(this.storage.set("itc_location_option", option).then(res => res));
  }

  readGeoLocation(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          observer.next(pos);
          observer.complete();
        },
        (err: PositionError) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }
}
