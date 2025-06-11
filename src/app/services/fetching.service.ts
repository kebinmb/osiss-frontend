import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Address,
  EducationBackground,
  EmergencyContact,
  EquityTargetIndicators,
  Family,
  Father,
  Mother,
  Student,
} from '../entity/all-details.model';

@Injectable({
  providedIn: 'root',
})
export class FetchingService {
  
}
