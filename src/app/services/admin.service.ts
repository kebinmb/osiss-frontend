import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EnrollmentDetails } from '../entity/all-details.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrlAdmin = environment.apiUrlAdmin;
  constructor(private http: HttpClient) {}

  public updateEnrollmentDetails(details: EnrollmentDetails): Observable<any> {
    return this.http.put<any>(`${this.apiUrlAdmin}/update`, details).pipe(
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
}
