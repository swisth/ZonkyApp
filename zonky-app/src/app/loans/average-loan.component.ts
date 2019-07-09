import { Component, OnInit } from '@angular/core';
import { ApiAdapterService } from "../services/api-adapter.service";

// component shows average loans by rating
@Component({
  selector: 'app-average-loan',
  templateUrl: './average-loan.component.html',
  styleUrls: ['./average-loan.component.css']
})
export class AverageLoanComponent implements OnInit {

  loans: MarketplaceLoanResult[];
  averageLoan: AverageLoanInfo;
  total: number;

  constructor(private apiAdapter: ApiAdapterService) { }

  // initializes component
  ngOnInit() {

    this.apiAdapter.getAverageLoansByRating("B").subscribe(
      averageLoan => this.averageLoan = averageLoan,
      (err) => alert("error: " + err.message),
      () => alert("complete")
    );
  
  }


}
