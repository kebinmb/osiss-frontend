import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDataComponent } from './component/student-data/student-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },  // 👈 default route
  { path: 'student', component: StudentDataComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
