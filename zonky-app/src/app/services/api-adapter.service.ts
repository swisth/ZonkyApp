import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AverageLoanObservableProvider } from './average-loan-observable';


// provides connection to Zonky API
@Injectable()
export class ApiAdapterService  {
  
  readonly apiBaseUrl = "https://api.zonky.cz";         // determines root url of Zonky API
  readonly maxItemsByRequest = 500;                    // determines count of items catched by one request
  readonly observableProvider: AverageLoanObservableProvider;
  
  constructor(private httpClient: HttpClient) {   
    this.observableProvider = new AverageLoanObservableProvider((u, p, s) => { return this.getLoans(u, p, s); });
  }


  // gets average loan info by rating
  getAverageLoansByRating(rating: string) {

    // assembles url query
    rating = rating.toUpperCase();
    let url = this.apiBaseUrl + "/loans/marketplace?rating__eq=" + encodeURIComponent(rating);

    // creates observable
    let result = this.observableProvider.getAverageLoanObservable(url, this.maxItemsByRequest)
      .pipe(map(x => { x.rating = rating; return x; }));
    return result;
  }


  // gets loans by page
  private getLoans(url: string, page: number, size: number): Observable<HttpResponse<MarketplaceLoanResult[]>> {
    let headers = new HttpHeaders({
      'X-Page': page.toString(),
      'X-Size': size.toString(),
      'Origin': 'https://crossorigin.me/'                   // browser ignore this anyway - disabling of CORS was needed   
    });
    let result = this.httpClient.get<MarketplaceLoanResult[]>(url, { headers: headers, observe: 'response' });
    return result;
  } 

}
