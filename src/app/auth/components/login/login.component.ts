import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { Observable } from "rxjs"
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface"
import { select, Store } from "@ngrx/store"
import { AppStateInterface } from "../../../shared/types/appState.interface"
import {
	isSubmittingSelector,
	validationErrorSelector,
} from "../../store/auth.selectors"
import { loginAction } from "../../store/actions/login.actions"
import { LoginRequestInterface } from "../../types/loginRequest.interface"

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
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

	initializeForm() {
		this.form = this.fb.group({
			email: "",
			password: "",
		})
	}

	onSubmit() {
		const request: LoginRequestInterface = {
			user: this.form.value,
		}
		this.store.dispatch(loginAction({ request }))
	}

	private initializeValues() {
		this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
		this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
	}
}
