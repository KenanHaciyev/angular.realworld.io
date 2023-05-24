import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PopularTagsComponent } from "./components/popular-tags/popular-tags.component"
import { PopularTagsService } from "./services/popular-tags.service"
import { StoreModule } from "@ngrx/store"
import { reducers } from "./store/popularTags.reducers"
import { EffectsModule } from "@ngrx/effects"
import { GetPopularTagsEffects } from "./store/effects/getPopularTags.effects"
import { LoadingModule } from "../loading/loading.module"
import { ErrorMessageModule } from "../errorMessage/error-message.module"
import { RouterModule } from "@angular/router"

@NgModule({
	declarations: [PopularTagsComponent],
	imports: [
		CommonModule,
		StoreModule.forFeature("popularTags", reducers),
		EffectsModule.forFeature([GetPopularTagsEffects]),
		LoadingModule,
		ErrorMessageModule,
		RouterModule,
	],
	providers: [PopularTagsService],
	exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
