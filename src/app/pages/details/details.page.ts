import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { YelpService } from "src/app/services/yelp.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  notFound: boolean;

  data$: Observable<any>;
  review$;
  loading = 2;

  constructor(private route: ActivatedRoute, private yelpService: YelpService) {}

  ngOnInit() {
    this.data$ = this.yelpService.getBusinessDetails(this.route.snapshot.paramMap.get("id")).pipe(
      tap(x => {
        this.loading--;
        this.notFound = x.status == "NOT_FOUND";
      })
    );
    this.review$ = this.yelpService.getBusinessReviews(this.route.snapshot.paramMap.get("id")).pipe(
      tap(x => {
        this.loading--;
        this.notFound = x.status == "NOT_FOUND";
      })
    );
  }
}
