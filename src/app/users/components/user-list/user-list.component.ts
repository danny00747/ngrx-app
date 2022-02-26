import {Component, OnInit} from '@angular/core';
import {User} from '@app/shared/model';
import {Store} from '@ngrx/store';
import {getCurrentCity, getError, getUsers, State} from '@app/users/state/selectors/user.selector';
import {Observable} from 'rxjs';
import {UserPageActions} from '@app/users/state/actions';
import {UserService} from '@app/users/services/user.service';
import {distinctUntilChanged} from 'rxjs/operators';
import {DialogService} from "primeng/dynamicdialog";
import {AddUserComponent} from "@app/users/components/add-user/add-user.component";

@Component({
  selector: 'pm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  errorMessage$: Observable<string>;
  cities$: Observable<string[]> = this.userService.cities$;
  city$: Observable<string>;

  constructor(private userService: UserService,
              private store: Store<State>,
              private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {

    this.city$ = this.store.select(getCurrentCity);

    this.city$
      .pipe(distinctUntilChanged())
      .subscribe((city: string) => this.store.dispatch(UserPageActions.loadFilteredUsers({city})));

    this.users$ = this.store.select(getUsers);

    this.errorMessage$ = this.store.select(getError);

  }

  onSelected(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.store.dispatch(UserPageActions.setCurrentCity({selectedCity: (value !== 'Display All') ? value : null}));
  }

  openAddUserDialog(): void {
    const ref = this.dialogService.open(AddUserComponent, {
      header: 'Edit your profile'
    });

    ref.onClose.subscribe(async (data: User) => {
      if (data) {
        // this.toastService.show(EToastSeverities.SUCCESS, 'Successfully created !');
      }
    });
  }
}
