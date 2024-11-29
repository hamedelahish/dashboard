import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICategoriesResponse } from '../../models/global.model';

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

  insertCategory(categoryData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/InsertCategory`,
      categoryData,
      { headers }
    );
  }

  updateCategory(categoryData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/UpdateCategory`,
      categoryData,
      { headers }
    );
  }
  removeCategory(categoryData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/RemoveCategory`,
      categoryData,
      { headers }
    );
  }

  UpdateCategoriesOrder(categoryData: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/UpdateCategoriesOrder`,
      JSON.stringify(categoryData),
      { headers }
    );
  }

}

