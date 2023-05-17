import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { RegisterRequestInterface } from "../types/registerRequest.interface"
import { map, Observable } from "rxjs"
import { CurrentUserInterface } from "../../shared/types/currentUser.interface"
import { environment } from "../../../environments/environment"
import { AuthResponseInterface } from "../types/authResponse.interface"

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}

	register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
		return this.http
			.post<AuthResponseInterface>(environment.apiUrl + "/users", data)
			.pipe(map((data) => data.user))
	}
}
