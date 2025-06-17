import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly apiUrlExport = environment.apiUrlExport;
  constructor(private http: HttpClient) {}
  exportToExcel() {
    this.http
      .get(`${this.apiUrlExport}/export-excel`, {
        responseType: 'blob', // <-- this is important for binary file download
      })
      .subscribe(
        (blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = 'students.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
        },
        (error) => {
          console.error('Export failed:', error);
        }
      );
  }
}
