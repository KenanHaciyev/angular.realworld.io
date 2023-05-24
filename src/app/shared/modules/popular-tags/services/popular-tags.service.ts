import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { environment } from "../../../../../environments/environment"
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface"

@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {

  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<string[]> {
    return this.http.get(environment.apiUrl+"/tags").pipe(map((response: GetPopularTagsResponseInterface)=>
      response.tags
    ))
  }
}
