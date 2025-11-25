import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search-service.service';
import { BusBooking, BusBookingPassenger, IScheduleData } from '../../model/model';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule,NgClass,FormsModule],
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
      const isExist = this.selectedSeatArray.findIndex(m=> m.seatNo==seatNo);
      if(isExist!=-1){
        this.selectedSeatArray.splice(isExist,1);
      }
      else{
      const busBookingPassenger:BusBookingPassenger = new BusBookingPassenger();
      busBookingPassenger.seatNo = seatNo;
      this.selectedSeatArray.push(busBookingPassenger);
      }
  }

  isSeatSelected(seatNo: number){
    const check = this.selectedSeatArray.find(m=> m.seatNo==seatNo);

    if(check==undefined)return false;
    return true;
  }

  completeBooking(){
  
    let busBooking: BusBooking = new BusBooking(0,10798, new Date(), this.busDetails.scheduleId, this.selectedSeatArray);
    this.searchService.postBooking(busBooking).subscribe((res)=>{
      alert("Ticket is booked successfully");
    });
  }

  
}
