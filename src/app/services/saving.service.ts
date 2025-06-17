import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Student, Address, EducationBackground, EmergencyContact, EquityTargetIndicators, Family, Father, Mother, EnrollmentDetails } from '../entity/all-details.model';

export interface AllDetailsRequest {
  studentRequest: Student;
  addressRequest: Address;
  educationBackgroundRequest: EducationBackground;
  emergencyContactRequest: EmergencyContact;
  equityTargetIndicatorsRequest: EquityTargetIndicators[];
  familyRequest: Family;
  fatherRequest: Father;
  motherRequest: Mother;
}
@Injectable({
  providedIn: 'root'
})
export class SavingService {
private readonly savingAPI = environment.apiUrlSave;
  constructor(private http: HttpClient) {}

  public saveStudentDetails(details: AllDetailsRequest): Observable<any> {
    return this.http.post<any>(`${this.savingAPI}/new`, details).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Backend returned error:', error);
        let backendMessage = 'Unknown error occurred.';
        if (
          error.error &&
          typeof error.error === 'object' &&
          error.error.message
        ) {
          backendMessage = error.error.message;
        } else if (typeof error.error === 'string') {
          backendMessage = error.error;
        }
        return throwError(() => new Error(backendMessage));
      })
    );
  }

  public getEnrollmentDetails(id: number): Observable<any> {
  const params = new HttpParams().set('id', id.toString());
  return this.http.post<any>(`${this.savingAPI}/get`, null, { params });
}




  
}
