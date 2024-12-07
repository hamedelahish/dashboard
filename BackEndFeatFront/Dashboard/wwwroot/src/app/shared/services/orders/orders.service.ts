import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrdersResponse, IProductResponse, ISearchOrderParams } from '../../models/global.model';
import { IOrderResponse, IOrderResponseDetail, IOrderResponseItem } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  model = 'Orders';
  constructor(private http: HttpClient) {}


  getOrderDetails(orderId: number): Observable<IOrderResponseDetail> {
    return this.http.get<IOrderResponseDetail>(
      `${environment.baseUrl}${this.model}/GetOrdersWithDetail?orderId=${orderId}`
    );
  }
  getOrderStatus(): Observable<IOrderResponse[]> {
    return this.http.get<IOrderResponse[]>(
      `${environment.baseUrl}${this.model}/GetOrderStatuses`
    );
  }
  updateOrderStatus(orderId: number, statusId: number): Observable<string> {
    return this.http.put(
      `${environment.baseUrl}${this.model}/UpdateOrderStatus?orderId=${orderId}&statusId=${statusId}`,
      {}, 
      { responseType: 'text' }
    );
  }
  
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
