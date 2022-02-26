import {createAction, props} from '@ngrx/store';
import {User} from '@app/shared/model/user';

export const loadFilteredUsersSuccess = createAction('[User API] Load Filtered Users Success', props<{ users: User[] }>());

export const loadUserByCitySuccess = createAction('[User API] Load Users By City Success', props<{ users: User[] }>());

export const loadCitiesFailure = createAction('[User API] Load Fail', props<{ error: string }>());

export const loadFilteredUsersFailure = createAction('[User API] Load Filtered Users Fail', props<{ error: string }>());

export const updateUserSuccess = createAction('[User API] Update User Success', props<{ user: User }>());

export const createUserSuccess = createAction('[User API] Create User Success', props<{ user: User }>());

export const createUserFailure = createAction('[User API] Create User Fail', props<{ error: string }>());
