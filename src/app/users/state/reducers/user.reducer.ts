import {User} from '@app/shared/model';
import {UserApiActions, UserPageActions} from '@app/users/state/actions';
import {createReducer, on} from '@ngrx/store';

export interface UserState {
  selectedCity: string,
  filteredUsers: User[];
  error: string;
}

const initialState: UserState = {
  selectedCity: null,
  filteredUsers: [],
  error: ''
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserPageActions.setCurrentCity, (state: UserState, action): UserState => {
    return {
      ...state,
      selectedCity: action.selectedCity
    };
  }),
  on(UserApiActions.loadUserByCitySuccess, (state: UserState, action): UserState => {
    return {
      ...state,
      filteredUsers: action.users,
      error: ''
    };
  }),
  on(UserApiActions.loadFilteredUsersSuccess, (state: UserState, action): UserState => {
    return {
      ...state,
      filteredUsers: action.users,
      error: ''
    };
  }),
  on(UserApiActions.loadFilteredUsersFailure, (state: UserState, action): UserState => {
    return {
      ...state,
      filteredUsers: [],
      error: action.error
    };
  }),
  on(UserApiActions.createUserSuccess, (state: UserState, action): UserState => {
    return {
      ...state,
      filteredUsers: [...state.filteredUsers, action.user],
      error: ''
    };
  }),
  on(UserApiActions.createUserFailure, (state: UserState, action): UserState => {
    return {
      ...state,
      filteredUsers: [...state.filteredUsers],
      error: action.error
    };
  }),
);
