import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductFilterParameters } from '../../models/product.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICategoriesResponse, IProductResponse } from '../../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  model="Categories";
  constructor(private http: HttpClient) { }


 getCategories(): Observable<ICategoriesResponse[]> {
  const params = new URLSearchParams();

  return this.http.get<ICategoriesResponse[]>(`${environment.baseUrl}${this.model}/GetCategories`);
}

}

