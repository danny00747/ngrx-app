import * as AppState from '@app/state/app.state';
import {PostState} from '@app/posts/state/reducers/post.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

// Extends the app state to include the user feature.
// This is required because users are lazy loaded.
// So the reference to UserState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  posts: PostState;
}

// Selector functions
const getPostFeatureState = createFeatureSelector<PostState>('posts');

export const getShowUserId = createSelector(getPostFeatureState, state => state.showUserId);

export const getCurrentUserId = createSelector(getPostFeatureState, state => state.currentUserId);

export const getCurrentUser = createSelector(
  getPostFeatureState, getCurrentUserId,
  (state, currentUserId) => currentUserId ? state.users.find(u => u.id === currentUserId) : null);

export const getUsers = createSelector(getPostFeatureState, state => state.users);

export const getError = createSelector(getPostFeatureState, state => state.error);

export const getUserPosts = createSelector(getPostFeatureState, (state) => state.currentUserposts);
