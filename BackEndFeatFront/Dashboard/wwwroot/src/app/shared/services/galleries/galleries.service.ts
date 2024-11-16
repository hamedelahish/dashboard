import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProductResponse, ISearchParams } from '../../models/global.model';

@Injectable({
  providedIn: 'root',
})
export class GalleriesService {
  model = 'galleries';
  constructor(private http: HttpClient) {}


  updateGallery(productData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(
      `${environment.baseUrl}${this.model}/UpdateGallery`,
      productData,
      { headers }
    );
  }


}
