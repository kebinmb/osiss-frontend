import { Component } from '@angular/core';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  constructor(private exportService:ExportService){}
  ngOnInit(){
    this.exportService.exportToExcel();
  }
}
