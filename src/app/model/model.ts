export class Search {
    fromLocation: string;
    toLocation: string;
    date: string;
    
    constructor(){
        this.fromLocation = "";
        this.toLocation = "";
        this.date = "";
    }
}

export interface ISearchBus {
    availableSeats: number;
    totalSeats: number;
    price: number;
    arrivalTime: string;       // ISO datetime string
    scheduleId: number;
    departureTime: string;     // ISO datetime string
    busName: string;
    busVehicleNo: string;
    fromLocationName: string;
    toLocationName: string;
    vendorName: string;
    scheduleDate: string;      // ISO date string
    vendorId: number;
  }

  export interface IScheduleData {
    scheduleId: number;
    vendorId: number;
    busName: string;
    busVehicleNo: string;
    fromLocation: number;
    toLocation: number;
    departureTime: string;
    arrivalTime: string;
    scheduleDate: string;
    price: number;
    totalSeats: number;
  }

  export interface BusBooking {
    bookingId: number
    custId: number
    bookingDate: string
    scheduleId: number
    busBookingPassengers: BusBookingPassenger[]
  }
  
  export class BusBookingPassenger {
    passengerId: number;
    bookingId: number;
    passengerName: string;
    age: number;
    gender: string;
    seatNo: number;

    constructor(){
        this.passengerId = 0;
        this.bookingId = 0;
        this.passengerName = "";
        this.age = 0;
        this.gender = "";
        this.seatNo = 0;
    }
  }
  
  
  