import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {StoreModule} from '@ngrx/store';
import {userReducer} from '@app/users/state/reducers/user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from '@app/users/state/effects/user.effects';
import {SharedModule} from '@app/shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import {DialogService} from "primeng/dynamicdialog";


const userRoutes: Routes = [
  {path: '', component: UserListComponent}
];


@NgModule({
  declarations: [UserListComponent, AddUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects])
  ], providers: [DialogService]
})
export class UsersModule {
}
