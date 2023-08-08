import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { MainComponent } from './components/main/main.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: 'car/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
