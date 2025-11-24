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
  searchObj: Search = new Search();

  ngOnInit(): void {
    //debugger;
      this.getAllBusLocations();
  }

  getAllBusLocations()
  {
    // debugger;
    this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusLocations").subscribe((data:any)=>{
        this.locationList = data;
    });
  }


  searchBus(){
    console.log(this.searchObj);
    this.router.navigate(['/search-result',this.searchObj.fromLocation, this.searchObj.toLocation ,this.searchObj.date]);
    //this.router.navigate(['/search-result',"141", "142" ,"19-02-2025"]);
  }

}
