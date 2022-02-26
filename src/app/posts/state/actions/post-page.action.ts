import {createAction, props} from '@ngrx/store';

export const toggleUserId = createAction('[Post Page] Toggle User Id');

export const setCurrentUser = createAction('[Post Page] Set Current User', props<{ currentUserId: number }>());

export const loadCurrentUserPosts = createAction('[Post Page] Load Current User Posts', props<{ currentUserId?: number }>());

export const clearCurrentUser = createAction('[Post Page] Clear Current User');

export const initializeCurrentUser = createAction('[Post Page] Initialize Current User');

export const loadUsers = createAction('[Post Page] Load Users');
