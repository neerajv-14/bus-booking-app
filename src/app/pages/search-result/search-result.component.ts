import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ISearchBus, Search } from '../../model/model';
import { SearchService } from '../../service/search-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  imports: [DatePipe, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
    activatedRoute = inject(ActivatedRoute);
    searchService = inject(SearchService);
    searchObj: Search = new Search();
    searchBusResult: ISearchBus[] = [];
    constructor(){
      this.activatedRoute.params.subscribe((res: any)=>{
        //debugger
          this.searchObj.date = res.date;
          this.searchObj.fromLocation = res.fromId;
          this.searchObj.toLocation = res.toId;
          this.getSearchResult();
      })
    }

    getSearchResult(){
      console.log(this.searchObj);
      this.searchService.searchBus(this.searchObj).subscribe((res:any)=>{
        //debugger;
          this.searchBusResult = res;
      })
    }


}
