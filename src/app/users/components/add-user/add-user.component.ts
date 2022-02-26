import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Address, User} from "@app/shared/model";


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

    constructor(public ref: DynamicDialogRef) {}

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
        this.ref.close(newUser);
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
