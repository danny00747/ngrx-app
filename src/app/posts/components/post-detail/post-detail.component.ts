import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentUser, getUserPosts, State} from '@app/posts/state/selectors/post.selector';
import {combineLatest} from 'rxjs';
import {Post} from '@app/shared/model/post';
import {User} from '@app/shared/model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {

  selectedUser$ = this.store.select(getCurrentUser);

  posts$ = this.store.select(getUserPosts);

  vm$ = combineLatest([
    this.posts$,
    this.selectedUser$
  ]).pipe(map(([posts, user]: [Post[], User]) => ({posts, selectedUser: user})));

  constructor(private store: Store<State>) {}

}
