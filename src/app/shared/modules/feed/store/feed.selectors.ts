import { AppStateInterface } from "../../../types/appState.interface"
import { FeedStateInterface } from "../types/feedState.interface"
import { createSelector } from "@ngrx/store"

export const feedFeatureSelector = (
	state: AppStateInterface
): FeedStateInterface => state.feed

export const isLoadingFeedSelector = createSelector(
	feedFeatureSelector,
	(feedState: FeedStateInterface) => feedState.isLoading
)

export const errorFeedSelector = createSelector(
	feedFeatureSelector,
	(feedState: FeedStateInterface) => feedState.error
)

export const feedSelector = createSelector(
	feedFeatureSelector,
	(feedState: FeedStateInterface) => feedState.data
)
