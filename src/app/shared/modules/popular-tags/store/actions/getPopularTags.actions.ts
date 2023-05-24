import { createAction, props } from "@ngrx/store"
import { ActionsType } from "../actionsType"

export const getPopularTagsAction = createAction(ActionsType.GET_POPULAR_TAGS)
export const getPopularTagsSuccessAction = createAction(
	ActionsType.GET_POPULAR_TAGS_SUCCESS,
	props<{ popularTags: string[] }>()
)
export const getPopularTagsFailureAction = createAction(
	ActionsType.GET_POPULAR_TAGS_FAILURE
)
