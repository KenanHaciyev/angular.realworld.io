import { Action, createReducer, on } from "@ngrx/store"
import { AuthStateInterface } from "../types/authState.interface"
import * as authActions from "./actions/register.actions"
import * as loginActions from "./actions/login.actions"
import * as userActions from "./actions/getCurrentUser.actions"

const initialState: AuthStateInterface = {
	isSubmitting: false,
	isLoading: false,
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
	),
	on(
		loginActions.loginAction,
		(state): AuthStateInterface => ({
			...state,
			isSubmitting: true,
			validationErrors: null,
		})
	),
	on(
		loginActions.loginSuccessAction,
		(state, action): AuthStateInterface => ({
			...state,
			isSubmitting: false,
			isLoggedIn: true,
			currentUser: action.currentUser,
		})
	),
	on(
		loginActions.loginFailureAction,
		(state, action): AuthStateInterface => ({
			...state,
			isSubmitting: false,
			validationErrors: action.errors,
		})
	),
	on(
		userActions.getCurrentUserAction,
		(state): AuthStateInterface => ({
			...state,
			isLoading: true,
		})
	),
	on(
		userActions.getCurrentUserSuccessAction,
		(state, action): AuthStateInterface => ({
			...state,
			isLoading: false,
			currentUser: action.currentUser,
			isLoggedIn: true,
		})
	),
	on(
		userActions.getCurrentUserFailureAction,
		(state): AuthStateInterface => ({
			...state,
			isLoading: false,
			isLoggedIn: false,
			currentUser: null,
		})
	)
)

export function reducers(state: AuthStateInterface, action: Action) {
	return authReducer(state, action)
}
