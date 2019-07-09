import { Observer, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';


// holds state of average loan observable
class AverageLoanObservableState {

  info: AverageLoanInfo = <AverageLoanInfo>{   
    total: 0,
    currentCount: 0,
    sum: 0,
    average: 0,
    progress: 0   
  };

  readonly observer: Observer<AverageLoanInfo>;
  readonly url: string;
  readonly size: number;
  page: number = 0;
  stopLoading: boolean = false;
  

  constructor(url: string, size: number, observer: Observer<AverageLoanInfo>) {
    this.url = url;
    this.size = size;
    this.observer = observer;
  }

}


// provides loan loading process as observable
export class AverageLoanObservableProvider {
      
  private readonly getLoans: (url: string, page: number, size: number) => Observable<HttpResponse<MarketplaceLoanResult[]>>;
  

  constructor(getLoans: (url: string, page: number, size: number) => Observable<HttpResponse<MarketplaceLoanResult[]>>) {
    this.getLoans = getLoans;
  }


  // creates average loan observable
  getAverageLoanObservable(url: string, size: number): Observable<AverageLoanInfo> {
    
    // initializes observable    
    let result = new Observable<AverageLoanInfo>(observer => {     

      let observableState = new AverageLoanObservableState(url, size, observer);

      // start obtaining of loans
      observer.next(observableState.info);
      this.getLoansForObservable(observableState);

      // initializes teardown logic
      var result = { unsubscribe() { observableState.stopLoading = true } };
      return result;
    });
    return result;
  }


  // starts getLoansForObservable routine
  private getLoansForObservable(state: AverageLoanObservableState) {

    // starts loading
    this.getLoans(state.url, state.page, state.size).subscribe(
      response => {

        // if process was tear down, loaded loans are not processed
        if (state.stopLoading)         
          return;
        
        // loads data
        let total = parseInt(response.headers.get("X-Total"));
        let loans = response.body;

        // updates average info
        let info = state.info;
        info.total = total;
        info.currentCount += loans.length;
        info.sum += this.getSum(loans);
        info.average = info.currentCount <= 0 ? 0 : Math.round(info.sum / info.currentCount);
        info.progress = Math.round(info.currentCount / info.total * 100);


        // pass average info to GUI      
        state.observer.next(state.info);

        // updates page and determine whether another loans should be loaded
        state.page++;
        if (state.page * state.size >= total) {
          state.observer.complete();
          return;
        }

        // loads next batch
        this.getLoansForObservable(state);
      },
      err => {
        console.log(err.message);
        state.observer.error(err);
      });

  }

  // computes sum of the loans' amounts
  private getSum(loans: MarketplaceLoanResult[]): number {
    var result = 0;
    loans.forEach(loan => result += loan.amount);
    return result;
  }   

}
