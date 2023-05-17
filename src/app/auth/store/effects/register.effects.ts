import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import * as registerActions from "../actions/register.actions"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { AuthService } from "../../services/auth.service"
import { registerFailureAction } from "../actions/register.actions"
import { HttpErrorResponse } from "@angular/common/http"
import { PersistanceService } from "../../../shared/services/persistance.service"
import { Router } from "@angular/router"

@Injectable()
export class RegisterEffects {
	register$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(registerActions.registerAction),
			switchMap(({ request }) => {
				return this.authService.register(request).pipe(
					map((currentUser) => {
						this.persistenceService.set("accessToken", currentUser.token)
						return registerActions.registerSuccessAction({ currentUser })
					}),
					catchError((errorResponse: HttpErrorResponse) =>
						of(registerFailureAction({ errors: errorResponse.error.errors }))
					)
				)
			})
		)
	})

	redirect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(registerActions.registerSuccessAction),
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
