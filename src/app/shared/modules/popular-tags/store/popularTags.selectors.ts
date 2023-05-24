import { AppStateInterface } from "../../../types/appState.interface"
import { createSelector } from "@ngrx/store"
import { PopularTagsStateInterface } from "../types/popularTagsState.interface"

export const popularTagsFeatureSelector = (state: AppStateInterface) =>
	state.popularTags

export const popularTagsSelector = createSelector(
	popularTagsFeatureSelector,
	(state: PopularTagsStateInterface) => {
		return state.data
	}
)

export const isLoadingSelector = createSelector(
	popularTagsFeatureSelector,
	(state: PopularTagsStateInterface) => state.isLoading
)

export const errorSelector = createSelector(
	popularTagsFeatureSelector,
	(state: PopularTagsStateInterface) => state.error
)
