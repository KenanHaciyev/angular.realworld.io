import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AuthService } from "../../services/auth.service"
import { PersistanceService } from "../../../shared/services/persistance.service"
import * as curUsActions from "../actions/getCurrentUser.actions"
import { catchError, map, of, switchMap } from "rxjs"
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface"
import { Injectable } from "@angular/core"

@Injectable()
export class GetCurrentUserEffects {
	getCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(curUsActions.getCurrentUserAction),
			switchMap(() => {
				const token = localStorage.getItem("accessToken")
				if (!token) {
					return of(curUsActions.getCurrentUserFailureAction())
				}
				return this.authService.getCurrentUser().pipe(
					map((currentUser: CurrentUserInterface) => {
						return curUsActions.getCurrentUserSuccessAction({ currentUser })
					}),
					catchError(() => {
						return of(curUsActions.getCurrentUserFailureAction())
					})
				)
			})
		)
	)

	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private persistenceService: PersistanceService
	) {}
}
