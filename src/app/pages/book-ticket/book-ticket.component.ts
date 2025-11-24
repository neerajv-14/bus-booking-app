import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search-service.service';
import { BusBookingPassenger, IScheduleData } from '../../model/model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent {

  scheduleId!: number;
  router = inject(ActivatedRoute);
  searchService = inject(SearchService);
  busDetails!: IScheduleData;
  seatArray: number[] = [];
  selectedSeatArray: BusBookingPassenger[] = [];

  constructor(){
    this.router.params.subscribe((res:any)=>{
      this.scheduleId = res.scheduleId;
      this.getBusScheduleById();
    })
  }

  getBusScheduleById(){
    this.searchService.getBusScheduleById(this.scheduleId).subscribe((res:IScheduleData)=>{
      this.busDetails = res;
      for(let i=1;i<=this.busDetails.totalSeats;i++){
        this.seatArray.push(i);
      }
    })
  }

  onSelect(seatNo: number){
      
  }

  
}
