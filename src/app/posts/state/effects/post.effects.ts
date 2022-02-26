import {Injectable} from '@angular/core';

import {mergeMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '@app/users/services/user.service';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {User} from '@app/shared/model';
import {PostApiActions, PostPageActions} from '@app/posts/state/actions';
import {Post} from '@app/shared/model/post';
import {PostService} from '@app/posts/services/post.service';

@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private userService: UserService, private postService: PostService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PostPageActions.loadUsers),
        mergeMap(() => this.userService.getUsers()
          .pipe(
            map((users: User[]) => PostApiActions.loadUsersSuccess({users})),
            catchError(error => of(PostApiActions.loadUsersFailure({error})))
          )
        )
      );
  });

  loadUserPosts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PostPageActions.loadCurrentUserPosts),
        mergeMap((action) => this.postService.getUserPosts(action.currentUserId)
          .pipe(
            map((posts: Post[]) => PostApiActions.setCurrentUserPostsSuccess({currentUserposts: posts})),
            catchError(error => of(PostApiActions.setCurrentUserPostsFailure({error})))
          )
        )
      );
  });

}
