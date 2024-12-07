import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  ConvertToPersianDate(date: string): string {
    return moment(date) 
      .locale('fa') 
      .format('YYYY/MM/DD');
  }
  ConvertToGregorianDate(persianDate: string): string {
    const gregorianDate = moment.from(persianDate, 'fa', 'jYYYY/jMM/jDD');
    return gregorianDate.format('YYYY-MM-DD HH:mm:ss.SSSSSSS');
  }
}
