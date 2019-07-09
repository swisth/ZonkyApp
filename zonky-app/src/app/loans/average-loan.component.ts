import { Component, OnInit } from '@angular/core';
import { ApiAdapterService } from "../services/api-adapter.service";
import { Subscription } from "rxjs"

// component shows average loans by rating
@Component({
  selector: 'app-average-loan',
  templateUrl: './average-loan.component.html',
  styleUrls: ['./average-loan.component.css']
})
export class AverageLoanComponent {

  rating: string = 'A';
  averageLoan: AverageLoanInfo = null;  
  inProgress: boolean = false;
  currentSubscription: Subscription = null;
  errorMessage: string = null;

    
  constructor(private apiAdapter: ApiAdapterService) { }
 

  compute() {

    // stops loading of previous query, if any
    if (this.inProgress) {
      this.currentSubscription.unsubscribe();
      this.inProgress = false;
    }

    // stars loading of new query
    this.inProgress = true;
    this.errorMessage = null;
    this.currentSubscription = this.apiAdapter.getAverageLoansByRating(this.rating).subscribe(

      // next
      averageLoan => this.averageLoan = averageLoan,

      // error
      (err) => {
        this.errorMessage = err.message;
        this.averageLoan = null;
        this.inProgress = false;        
      },

      // complete
      () => this.inProgress = false
      
    );   
  }


}
