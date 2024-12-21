import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsersResponse } from '../../models/global.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  model = 'User';
  constructor(private http: HttpClient) {}


  updateUserAndCustomer(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    return this.http.put(
      `${environment.baseUrl}${this.model}/updateUserAndCustomer`,
      user,
      { headers }
    );
  }

  insertUserAndCustomer(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    return this.http.post(
      `${environment.baseUrl}${this.model}/InsertUserAndCustomer`,
      user,
      { headers }
    );
  }
  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders();    
    return this.http.delete(
      `${environment.baseUrl}${this.model}/RemoveUser`,
      { headers, params: { userId } }
  )
  }

  getAllUsers({ fullName='',pageNumber = "1", pageSize = "10"}): Observable<IUsersResponse> {
      const headers = new HttpHeaders();
    return this.http.get<IUsersResponse>(
      `${environment.baseUrl}${this.model}/GetAllUsers`,
      { headers, params: { fullName,pageNumber, pageSize } }
    );
  }

}
