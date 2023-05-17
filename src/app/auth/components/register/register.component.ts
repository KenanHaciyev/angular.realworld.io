import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { select, Store } from "@ngrx/store"
import { registerAction } from "../../store/actions/register.actions"
import { Observable } from "rxjs"
import { AppStateInterface } from "../../../shared/types/appState.interface"
import {
	isSubmittingSelector,
	validationErrorSelector,
} from "../../store/auth.selectors"
import { RegisterRequestInterface } from "../../types/registerRequest.interface"
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface"

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	form: FormGroup
	isSubmitting$: Observable<boolean>
	backendErrors$: Observable<BackendErrorsInterface | null>

	constructor(
		private fb: FormBuilder,
		private store: Store<AppStateInterface>
	) {}

	ngOnInit(): void {
		this.initializeForm()
		this.initializeValues()
	}

	private initializeValues() {
		this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
		this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
	}

	initializeForm() {
		this.form = this.fb.group({
			username: ["", Validators.required],
			email: "",
			password: "",
		})
	}

	onSubmit() {
		const request: RegisterRequestInterface = {
			user: this.form.value,
		}
		this.store.dispatch(registerAction({ request }))
	}
}
