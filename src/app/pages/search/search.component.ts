import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Search } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  http = inject(HttpClient);
  router = inject(Router);
  locationList: any[] = [];
  from!: string;
  to!: string;
  date!: string;
  searchObj!: Search;

  ngOnInit(): void {
    //debugger;
      this.getAllBusLocations();
  }

  getAllBusLocations()
  {
    //debugger;
    this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusLocations").subscribe((data:any)=>{
        this.locationList = data;
    });
  }


  searchBus(){
    // this.http.get('https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=' + this.searchObj.fromLocation  + '&toLocation=' + this.searchObj.toLocation+'&travelDate=' + this.searchObj.date)
    // .subscribe((data:any)=> {

    // });
    // this.from = this.searchObj.fromLocation;
    // this.to = this.searchObj.toLocation;
    // this.date = this.searchObj.date;
    this.searchObj.fromLocation = "1";
    this.searchObj.toLocation = "2";
    this.searchObj.date = "18-10-2023";
    //this.router.navigate(['/search-result',this.from, this.to ,this.date]);

    this.router.navigate(['/search-result',this.searchObj.fromLocation, this.searchObj.toLocation ,this.searchObj.date]);
  }

}
