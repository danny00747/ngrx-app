import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {NgForm} from "@angular/forms";
import {Address, User} from "@app/shared/model";
import {Store} from "@ngrx/store";
import {State} from "@app/users/state/selectors/user.selector";
import {UserPageActions} from "@app/users/state/actions";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    name: string;
    username: string;
    email: string;
    city: string;
    phoneNumber: string;
    zipcode: string;

    constructor(public ref: DynamicDialogRef,
                private store: Store<State>,
                private config: DynamicDialogConfig,) {
    }

    ngOnInit(): void {
    }

    submit(): void {

        const address: Address = {
            city: this.city,
            zipcode: this.zipcode
        }

        const newUser: Omit<User, 'id'> = {
            name: this.name,
            username: this.username,
            phone: this.phoneNumber,
            address: address,
            email: this.email
        };

        this.store.dispatch(UserPageActions.createUser({user: newUser}));
        this.ref.close();
    }

    autoFill(): void {
        const cities = ['Nivelles', 'Bruges', 'Brussels', 'Namur'];
        this.name = Math.random().toString(36).substr(2, 9);
        this.username = Math.random().toString(36).substr(2, 9);
        this.email = `${this.username}@gmail.com`;
        this.city = cities[Math.floor(Math.random() * (4))];
        this.phoneNumber = Math.random().toString().slice(2,11);
        this.zipcode = '1234';
    }
}
