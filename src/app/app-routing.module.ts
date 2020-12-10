import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { AllPageComponent } from './all-page/all-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: 'add', component: AddPageComponent },
  { path: 'all', component: AllPageComponent },
  { path: 'event/:id', component: EventComponent },
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
