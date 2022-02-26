import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuComponent } from './components/menu/menu.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [WelcomeComponent, MenuComponent],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
