import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDataComponent } from './component/student-data/student-data.component';
import { ThankYouComponent } from './component/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },  // 👈 default route
  { path: 'student', component: StudentDataComponent },
  { path: 'thank-you',component:ThankYouComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
