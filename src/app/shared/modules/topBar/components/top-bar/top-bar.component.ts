import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { CurrentUserInterface } from "../../../../types/currentUser.interface"
import { select, Store } from "@ngrx/store"
import { AppStateInterface } from "../../../../types/appState.interface"
import {
	currentUserSelector,
	isAnonymousSelector,
	isLoggedInSelector,
} from "../../../../../auth/store/auth.selectors"

@Component({
	selector: "app-top-bar",
	templateUrl: "./top-bar.component.html",
	styleUrls: ["./top-bar.component.scss"],
})
export class TopBarComponent implements OnInit {
	isLoggedIn$: Observable<boolean>
	isAnonymous$: Observable<boolean>
	currentUser$: Observable<CurrentUserInterface | null>

	constructor(private store: Store<AppStateInterface>) {}

	ngOnInit(): void {
		this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
		this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
		this.currentUser$ = this.store.pipe(select(currentUserSelector))
	}
}
