import { PopularTagsStateInterface } from "../types/popularTagsState.interface"
import { Action, createReducer, on } from "@ngrx/store"
import * as popularTagsActions from "./actions/getPopularTags.actions"

const initialState: PopularTagsStateInterface = {
	data: null,
	isLoading: false,
	error: null,
}

export const reducer = createReducer(
	initialState,
	on(
		popularTagsActions.getPopularTagsAction,
		(state): PopularTagsStateInterface => ({
			...state,
			isLoading: true,
		})
	),
	on(
		popularTagsActions.getPopularTagsSuccessAction,
		(state, action): PopularTagsStateInterface => ({
			...state,
			isLoading: false,
			data: action.popularTags,
		})
	),
	on(
		popularTagsActions.getPopularTagsFailureAction,
		(state): PopularTagsStateInterface => ({
			...state,
			isLoading: false,
		})
	)
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
	return reducer(state, action)
}
