import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface"
import { environment } from "../../../../../environments/environment"

@Injectable({
	providedIn: "root",
})
export class FeedService {
	constructor(private http: HttpClient) {}

	getFeed(url: string): Observable<GetFeedResponseInterface> {
		return this.http.get<GetFeedResponseInterface>(environment.apiUrl + url)
	}
}
