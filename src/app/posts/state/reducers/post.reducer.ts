import {Post} from '@app/shared/model/post';
import {User} from '@app/shared/model';
import {createReducer, on} from '@ngrx/store';
import {PostApiActions, PostPageActions} from '@app/posts/state/actions';

export interface PostState {
  showUserId: boolean;
  currentUserId: number | null;
  users: User[];
  currentUserposts: Post[];
  error: string;
}

const initialState: PostState = {
  showUserId: true,
  currentUserId: null,
  users: [],
  currentUserposts: [],
  error: ''
};


export const postReducer = createReducer<PostState>(
  initialState,
  on(PostPageActions.toggleUserId, (state: PostState): PostState => {
    return {
      ...state,
      showUserId: !state.showUserId
    };
  }),

  on(PostPageActions.setCurrentUser, (state: PostState, action): PostState => {
    return {
      ...state,
      currentUserId: action.currentUserId
    };
  }),

  on(PostPageActions.clearCurrentUser, (state: PostState): PostState => {
    return {
      ...state,
      currentUserId: null
    };
  }),
  on(PostPageActions.initializeCurrentUser, (state: PostState): PostState => {
    return {
      ...state,
      currentUserId: 0
    };
  }),
  on(PostApiActions.setCurrentUserPostsSuccess, (state: PostState, action): PostState => {
    return {
      ...state,
      currentUserposts: action.currentUserposts,
      error: ''
    };
  }),
  on(PostApiActions.setCurrentUserPostsFailure, (state: PostState, action): PostState => {
    return {
      ...state,
      currentUserposts: [],
      error: action.error
    };
  }),


  on(PostApiActions.loadUsersSuccess, (state: PostState, action): PostState => {
    return {
      ...state,
      users: action.users,
      error: ''
    };
  }),
  on(PostApiActions.loadUsersFailure, (state: PostState, action): PostState => {
    return {
      ...state,
      users: [],
      error: action.error
    };
  }),
);
