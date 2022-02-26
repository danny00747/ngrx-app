import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as AppState from '@app/state/app.state';
import {UserState} from '../reducers/user.reducer';

// Extends the app state to include the user feature.
// This is required because users are lazy loaded.
// So the reference to UserState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  users: UserState;
}

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentCity = createSelector(getUserFeatureState, state => state.selectedCity);

export const getUsers = createSelector(getUserFeatureState, state => state.filteredUsers);

export const getError = createSelector(getUserFeatureState, state => state.error);
