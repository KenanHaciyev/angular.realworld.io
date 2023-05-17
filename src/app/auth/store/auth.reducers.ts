import { Action, createReducer, on } from "@ngrx/store"
import { AuthStateInterface } from "../types/authState.interface"
import * as authActions from "./actions/register.actions"

const initialState: AuthStateInterface = {
	isSubmitting: false,
	currentUser: null,
	isLoggedIn: null,
	validationErrors: null,
}

const authReducer = createReducer(
	initialState,
	on(
		authActions.registerAction,
		(state): AuthStateInterface => ({
			...state,
			isSubmitting: true,
			validationErrors: null,
		})
	),
	on(
		authActions.registerSuccessAction,
		(state, action): AuthStateInterface => ({
			...state,
			isSubmitting: false,
			isLoggedIn: true,
			currentUser: action.currentUser,
		})
	),
	on(
		authActions.registerFailureAction,
		(state, action): AuthStateInterface => ({
			...state,
			isSubmitting: false,
			validationErrors: action.errors,
		})
	)
)

export function reducers(state: AuthStateInterface, action: Action) {
	return authReducer(state, action)
}
