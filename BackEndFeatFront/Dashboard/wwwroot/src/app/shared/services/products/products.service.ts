import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProductResponse, ISearchParams } from '../../models/global.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  model = 'Products';
  constructor(private http: HttpClient) {}


  updateProduct(productData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/UpdateProduct`,
      productData,
      { headers }
    );
  }


  insertProduct(productData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/InsertProduct`,
      productData,
      { headers }
    );
  }

  deleteProducts(productIds: number[]): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(`${environment.baseUrl}${this.model}/DeleteProducts`, productIds, { headers });
  }

  getProductsWithFilter(
    filterParameters: ISearchParams
  ): Observable<IProductResponse> {
    const params = new URLSearchParams();
    params.append('pageNumber', filterParameters.pageNumber.toString());
    params.append('pageSize', filterParameters.pageSize.toString());

    if (filterParameters.searchText && filterParameters.searchText !== '') {
      params.append('name', filterParameters.searchText.toString().trim());
    }
    if (filterParameters.categoryId && filterParameters.categoryId !== '') {
      params.append('categoryId', filterParameters.categoryId.toString());
    }
    if (filterParameters.priceFrom && filterParameters.priceFrom !== '') {
      params.append('priceFrom', filterParameters.priceFrom.toString());
    }
    if (filterParameters.priceTo && filterParameters.priceTo !== '') {
      params.append('priceTo', filterParameters.priceTo.toString());
    }
    if (filterParameters.stock && filterParameters.stock !== '') {
      params.append('stock', filterParameters.stock.toString());
    }

    return this.http.get<IProductResponse>(
      `${environment.baseUrl}${
        this.model
      }/GetProductsWithFilter?${params.toString()}`
    );
  }
}
