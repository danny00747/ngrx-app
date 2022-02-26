import {Injectable} from '@angular/core';

import {mergeMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '../../services/user.service';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiActions, UserPageActions} from '@app/users/state/actions';
import {User} from '@app/shared/model';
import {loadFilteredUsersFailure, loadFilteredUsersSuccess} from '@app/users/state/actions/user-api.action';

@Injectable()
export class UserEffects {



  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loadFilteredUsers),
        mergeMap((action) => this.userService.getUsers(action.city)
          .pipe(
            map((users: User[]) => UserApiActions.loadFilteredUsersSuccess({users})),
            catchError(error => of(UserApiActions.loadFilteredUsersFailure({error})))
          )
        )
      );
  });

  createUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.createUser),
        mergeMap((action) => this.userService.createUser(action.user)
          .pipe(
            map((user: User) => UserApiActions.createUserSuccess({user})),
            catchError(error => of(UserApiActions.createUserFailure({error})))
          )
        )
      );
  });

  loadUsersByCity$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loadUsersByCity),
        mergeMap((action) => this.userService.getUsersByCity(action.city)
          .pipe(
            map((users: User[]) => UserApiActions.loadUserByCitySuccess({users})),
            catchError(error => of(UserApiActions.loadFilteredUsersFailure({error})))
          )
        )
      );
  });
}
