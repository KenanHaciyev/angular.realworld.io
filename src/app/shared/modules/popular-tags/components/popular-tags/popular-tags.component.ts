import { Component, OnInit } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { getPopularTagsAction } from "../../store/actions/getPopularTags.actions"
import { Observable } from "rxjs"
import {
	errorSelector,
	isLoadingSelector,
	popularTagsSelector,
} from "../../store/popularTags.selectors"

@Component({
	selector: "app-popular-tags",
	templateUrl: "./popular-tags.component.html",
	styleUrls: ["./popular-tags.component.scss"],
})
export class PopularTagsComponent implements OnInit {
	popularTags: Observable<string[] | null>
	isLoading$: Observable<boolean>
	error$: Observable<string | null>

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.initializeValues()
		this.fetchData()
	}

	private initializeValues() {
		this.popularTags = this.store.pipe(select(popularTagsSelector))
		this.isLoading$ = this.store.pipe(select(isLoadingSelector))
		this.error$ = this.store.pipe(select(errorSelector))
	}

	private fetchData() {
		this.store.dispatch(getPopularTagsAction())
	}
}
