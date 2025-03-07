import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ResidencesComponent } from './residences/residences.component';
import { ResidenceDetailsComponent } from './residence-details/residence-details.component';
import { AddResidenceComponent } from './add-residence/add-residence.component';
import { AddApartmentComponent } from './add-apartment/add-apartment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },
  { path: 'residences', component: ResidencesComponent },
  { path: 'test', component: TestComponent },
  { path: 'add-residence', component: AddResidenceComponent },  
  { path: 'add-residence/:id', component: AddResidenceComponent },  
  { path: "updateResidence/:id", component: AddResidenceComponent },
  { path: 'update-apartment/:id', component: AddApartmentComponent },  
  { path: '**', component: NotFoundComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }