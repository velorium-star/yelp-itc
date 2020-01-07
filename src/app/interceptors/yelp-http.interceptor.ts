import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class YelpHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.production
        ? environment.baseUrl + request.url
        : request.url,
      headers: request.headers.set(
        "Authorization",
        `Bearer ${environment.token}`
      )
    });

    return next.handle(request);
  }
}
