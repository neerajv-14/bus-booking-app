import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/search-service.service';
import { BusBooking, BusBookingPassenger, IScheduleData } from '../../model/model';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  imports: [DatePipe, CommonModule,NgClass,FormsModule, CurrencyPipe],
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent implements OnInit{

  scheduleId!: number;
  router = inject(ActivatedRoute);
  searchService = inject(SearchService);
  busDetails!: IScheduleData;
  seatArray: number[] = [];
  selectedSeatArray: BusBookingPassenger[] = [];

  fromLocation!:string;
  toLocation!:string;
  blockedSeats: number[] = [];
  constructor(){
    
  }
  ngOnInit(){
    this.router.params.subscribe((res:any)=>{
      this.scheduleId = res.scheduleId;
      this.getBusScheduleById();
      this.blockSeats(this.scheduleId);
    
      
    })
  }
  populateLocations() {
    this.searchService.getLocationById(this.busDetails.fromLocation).subscribe((res:any)=>{
  
      this.fromLocation = res.locationName;
    })

    this.searchService.getLocationById(this.busDetails.toLocation).subscribe((res:any)=>{
      this.toLocation = res.locationName;
    })
  }
  blockSeats(scheduleId: number) {
    this.searchService.getSeatsForScheduleId(scheduleId).subscribe((res:any)=>{
      this.blockedSeats = res;
    })
  }

  checkIfBooked(seatNo: number){
    const check = this.blockedSeats.find(m=> m==seatNo);

    if(check==undefined)return false;
    return true;
  }

  getBusScheduleById(){
    this.searchService.getBusScheduleById(this.scheduleId).subscribe((res:IScheduleData)=>{
      this.busDetails = res;
      debugger
      this.populateLocations();
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
      this.blockSeats(this.busDetails.scheduleId);
    });
  }

  
}
