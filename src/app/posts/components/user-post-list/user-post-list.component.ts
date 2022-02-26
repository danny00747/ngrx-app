import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@app/shared/model';
import {Store} from '@ngrx/store';
import {getError, getUsers, State} from '@app/posts/state/selectors/post.selector';
import {PostPageActions} from '@app/posts/state/actions';
import {getCurrentUser, getShowUserId} from '@app/posts/state/selectors/post.selector';

@Component({
  selector: 'pm-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit {

  users$: Observable<User[]>;
  errorMessage$: Observable<string>;
  selectedUser$: Observable<User>;
  displayUserId$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {

    this.store.dispatch(PostPageActions.loadUsers());

    this.users$ = this.store.select(getUsers);

    this.errorMessage$ = this.store.select(getError);

    this.displayUserId$ = this.store.select(getShowUserId);

    this.selectedUser$ = this.store.select(getCurrentUser);

  }

  userSelected(user: User): void {
    this.store.dispatch(PostPageActions.setCurrentUser({currentUserId: user.id}));
    this.store.dispatch(PostPageActions.loadCurrentUserPosts({currentUserId: user.id}));
  }

  checkChanged(): void {
    this.store.dispatch(PostPageActions.toggleUserId());
  }

}
