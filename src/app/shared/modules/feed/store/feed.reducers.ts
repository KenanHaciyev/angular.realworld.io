import { FeedStateInterface } from "../types/feedState.interface"
import { Action, createReducer, on } from "@ngrx/store"
import * as feedActions from "./actons/getFeed.actions"
import { routerNavigationAction } from "@ngrx/router-store"

export const initialState: FeedStateInterface = {
	isLoading: false,
	error: null,
	data: null,
}
export const feedReducer = createReducer(
	initialState,
	on(
		feedActions.getFeedAction,
		(state): FeedStateInterface => ({
			...state,
			isLoading: true,
		})
	),
	on(
		feedActions.getFeedSuccessAction,
		(state, actions): FeedStateInterface => ({
			...state,
			isLoading: false,
			data: actions.feed,
		})
	),
	on(
		feedActions.getFeedFailureAction,
		(state): FeedStateInterface => ({
			...state,
			isLoading: false,
		})
	),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
)

export function reducers(state: FeedStateInterface, action: Action) {
	return feedReducer(state, action)
}
