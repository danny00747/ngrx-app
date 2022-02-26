import {createAction, props} from '@ngrx/store';
import {User} from '@app/shared/model';
import {Post} from '@app/shared/model/post';


export const loadUsersSuccess = createAction('[Post API] Load Users Success', props<{ users: User[] }>());

export const loadUsersFailure = createAction('[Post API] Load Users Fail', props<{ error: string }>());

export const setCurrentUserPostsSuccess = createAction('[Post Page] Set Current User Posts Success', props<{ currentUserposts: Post[] }>());

export const setCurrentUserPostsFailure = createAction('[Post Page] Set Current User Posts Fail', props<{ error: string }>());
