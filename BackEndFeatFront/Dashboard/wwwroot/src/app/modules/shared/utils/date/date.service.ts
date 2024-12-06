import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  ConvertToPersianDate(date: string): string {
    return moment(date, 'MM/DD/YYYY HH:mm:ss')
    .locale('fa') 
    .format('YYYY/MM/DD');
  }
}
