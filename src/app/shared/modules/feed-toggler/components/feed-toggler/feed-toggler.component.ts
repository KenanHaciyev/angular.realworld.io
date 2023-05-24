import { Component, Input, OnInit } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { isLoggedInSelector } from "../../../../../auth/store/auth.selectors"

@Component({
	selector: "app-feed-toggler",
	templateUrl: "./feed-toggler.component.html",
	styleUrls: ["./feed-toggler.component.scss"],
})
export class FeedTogglerComponent implements OnInit {
	@Input() tagName: string | null
	isLoggedIn$: Observable<boolean>

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.initializeValue()
	}

	private initializeValue() {
		this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
	}
}
