import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusBooking, IScheduleData, Search } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  getLocationById(location: number) {
    return this.http.get("https://api.freeprojectapi.com/api/BusBooking/GetBusLocationById?id="+location);
  }

  constructor(private http: HttpClient) { }

  searchBus(searchObj: Search){
    return this.http.get('https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=' + searchObj.fromLocation  + '&toLocation=' + searchObj.toLocation+'&travelDate=' + searchObj.date);
  }

  getBusScheduleById(scheduleId: number) : Observable<IScheduleData> {
    return this.http.get<IScheduleData>('https://api.freeprojectapi.com/api/BusBooking/GetBusScheduleById?id='+scheduleId);
  }

  postBooking(busbooking: BusBooking){
    return this.http.post("https://api.freeprojectapi.com/api/BusBooking/PostBusBooking",busbooking);
  }

  getSeatsForScheduleId(scheduleId: number){
    return this.http.get("https://api.freeprojectapi.com/api/BusBooking/getBookedSeats?shceduleId="+ scheduleId);
  }
}
