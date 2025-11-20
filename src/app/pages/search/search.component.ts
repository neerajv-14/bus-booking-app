import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Search } from '../../model/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  http = inject(HttpClient);
  locationList: any[] = [];
  
  searchObj!: Search;

  ngOnInit(): void {
    debugger;
      this.getAllBusLocations();
  }

  getAllBusLocations()
  {
    debugger;
    this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusLocations").subscribe((data:any)=>{
        this.locationList = data;
    });
  }


  searchBus(){
    this.http.get('https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=' + this.searchObj.fromLocation  + '&toLocation=' + this.searchObj.toLocation+'&travelDate=' + this.searchObj.date)
  }

}
