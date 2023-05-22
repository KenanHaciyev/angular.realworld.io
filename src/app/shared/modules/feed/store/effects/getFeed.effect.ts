import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { FeedService } from "../../services/feed.service"
import { catchError, map, of, switchMap } from "rxjs"
import * as feedActions from "../actons/getFeed.actions"

@Injectable()
export class GetFeedEffect {
	getFeedEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(feedActions.getFeedAction),
			switchMap(({ url }) => {
				return this.feedService.getFeed(url).pipe(
					map((feed) => {
						return feedActions.getFeedSuccessAction({ feed })
					}),
					catchError(() => of(feedActions.getFeedFailureAction()))
				)
			})
		)
	)

	constructor(private actions$: Actions, private feedService: FeedService) {}
}
