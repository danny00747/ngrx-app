import { createAction, props } from '@ngrx/store';
import {User} from '@app/shared/model/user';

export const setCurrentCity = createAction('[User Page] Set Current City', props<{ selectedCity: string }>());

export const showFilteredCities = createAction('[User Page] show Filtered Cities');

export const loadUsersByCity = createAction('[User Page] Load User By City', props<{ city: string }>());

export const loadFilteredUsers = createAction('[User Page] Load Users', props<{ city?: string }>());

export const updateUser = createAction('[User Page] Update User', props<{ user: User }>());

export const deleteUser = createAction('[User Page] Delete User', props<{ userId: number }>());

export const createUser = createAction('[User Page] Create User', props<{ user: Omit<User, 'id'> }>());
