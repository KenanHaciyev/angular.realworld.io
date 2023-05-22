import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import * as loginActions from "../actions/login.actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { AuthService } from "../../services/auth.service"
import { HttpErrorResponse } from "@angular/common/http"
import { PersistanceService } from "../../../shared/services/persistance.service"
import { Router } from "@angular/router"
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface"

@Injectable()
export class LoginEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginActions.loginAction),
			switchMap(({ request }) => {
				return this.authService.login(request).pipe(
					map((currentUser: CurrentUserInterface) => {
						this.persistenceService.set("accessToken", currentUser.token)
						return loginActions.loginSuccessAction({ currentUser })
					}),
					catchError((errorResponse: HttpErrorResponse) => {
						return of(
							loginActions.loginFailureAction({
								errors: errorResponse.error.errors,
							})
						)
					})
				)
			})
		)
	)

	redirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginActions.loginSuccessAction),
				tap(() => {
					this.router.navigate(["/"])
				})
			),
		{ dispatch: false }
	)

	constructor(
		private router: Router,
		private actions$: Actions,
		private authService: AuthService,
		private persistenceService: PersistanceService
	) {}
}
