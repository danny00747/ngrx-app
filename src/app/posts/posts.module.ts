import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPostListComponent } from './components/user-post-list/user-post-list.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {postReducer} from '@app/posts/state/reducers/post.reducer';
import {PostEffects} from '@app/posts/state/effects/post.effects';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


const postRoutes: Routes = [
  {path: '', component: UserPostListComponent}
];

@NgModule({
  declarations: [UserPostListComponent, PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})
export class PostsModule { }
