import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from "../actions/getPopularTags.actions"
import { catchError, map, of, switchMap } from "rxjs"
import { PopularTagsService } from "../../services/popular-tags.service"

@Injectable()
export class GetPopularTagsEffects {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() =>
        this.popularTagsService.getPopularTags().pipe(
          map((popularTags:string[]) =>
            getPopularTagsSuccessAction({popularTags})
          ),
          catchError(() => of(getPopularTagsFailureAction()) )
        )
      )
    )
  )

  constructor(private actions$: Actions, private popularTagsService: PopularTagsService) {
  }
}
