import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Store } from "@ngrx/store"
import { registerAction } from "../../store/actions/register.actions"

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	constructor(private fb: FormBuilder, private store: Store) {}
	form: FormGroup
	ngOnInit(): void {
		this.initializeForm()
	}

	initializeForm() {
		this.form = this.fb.group({
			username: ["", Validators.required],
			email: "",
			password: "",
		})
		console.log(this.form.valid)
	}

	onSubmit() {
		console.log(this.form.value)
		this.store.dispatch(registerAction(this.form.value))
	}
}
