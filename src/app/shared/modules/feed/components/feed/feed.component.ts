import { Component, Input, OnInit } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { getFeedAction } from "../../store/actons/getFeed.actions"
import { Observable } from "rxjs"
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface"
import { errorFeedSelector, feedSelector, isLoadingFeedSelector } from "../../store/feed.selectors"
import { environment } from "../../../../../../environments/environment"
import { ActivatedRoute, Params, Router } from "@angular/router"
import queryString from 'query-string';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string
  public isLoading$: Observable<boolean>
  public errors$: Observable<string | null>
  public feed$: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl: string
  currentPage: number

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.inititializeValues()
    this.inititializeListeners()
  }

  private inititializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingFeedSelector))
    this.errors$ = this.store.pipe(select(errorFeedSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split("?")[0]
  }

  private fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringifiedParams = queryString.stringify({
      limit:this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }))
  }

  private inititializeListeners() {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = +(params["page"] || "1")
      this.fetchFeed()
    })
  }
}
