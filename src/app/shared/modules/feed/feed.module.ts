import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FeedComponent } from "./components/feed/feed.component"
import { GetFeedEffect } from "./store/effects/getFeed.effect"
import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"
import { reducers } from "./store/feed.reducers"
import { RouterModule } from "@angular/router"
import { ErrorMessageModule } from "../errorMessage/error-message.module"
import { LoadingModule } from "../loading/loading.module"
import { PaginationModule } from "../pagination/pagination.module"
import { TagListModule } from "../tagList/tag-list.module"

@NgModule({
	declarations: [FeedComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([GetFeedEffect]),
		StoreModule.forFeature("feed", reducers),
		RouterModule,
		ErrorMessageModule,
		LoadingModule,
		PaginationModule,
    TagListModule
	],
	exports: [FeedComponent],
})
export class FeedModule {}
