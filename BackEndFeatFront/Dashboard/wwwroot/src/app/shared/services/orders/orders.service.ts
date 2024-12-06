import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrdersResponse, IProductResponse, ISearchOrderParams } from '../../models/global.model';
import { IOrderResponseItem } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  model = 'Orders';
  constructor(private http: HttpClient) {}


  

  getOrdersWithFilter(
    filterParameters: ISearchOrderParams
  ): Observable<IOrdersResponse> {
    const params = new URLSearchParams();
    params.append('pageNumber', filterParameters.pageNumber.toString());
    params.append('pageSize', filterParameters.pageSize.toString());

    if (filterParameters.startDate && filterParameters.startDate !== '') {
      params.append('startDate', filterParameters.startDate.toString());
    }
    if (filterParameters.endDate && filterParameters.endDate !== '') {
      params.append('endDate', filterParameters.endDate.toString());
    }
    if (filterParameters.statusName && filterParameters.statusName !== '') {
      params.append('statusName', filterParameters.statusName.toString());
    }
    if (filterParameters.customerName && filterParameters.customerName !== '') {
      params.append('customerName', filterParameters.customerName.toString());
    }
 

    return this.http.get<IOrdersResponse>(
      `${environment.baseUrl}${
        this.model
      }/GetOrders?${params.toString()}`
    );
  }
}
