import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { RegisterRequestInterface } from "../types/registerRequest.interface"
import { map, Observable } from "rxjs"
import { CurrentUserInterface } from "../../shared/types/currentUser.interface"
import { environment } from "../../../environments/environment"
import { AuthResponseInterface } from "../types/authResponse.interface"
import { LoginRequestInterface } from "../types/loginRequest.interface"

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private http: HttpClient) {}

	getUser(response: AuthResponseInterface): CurrentUserInterface {
		return response.user
	}

	register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
		return this.http
			.post<AuthResponseInterface>(environment.apiUrl + "/users", data)
			.pipe(map((data) => data.user))
	}

	login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
		return this.http
			.post<AuthResponseInterface>(environment.apiUrl + "/users/login", data)
			.pipe(map((response) => response.user))
	}

	getCurrentUser() {
		const url = environment.apiUrl + "/user"
		return this.http
			.get(url)
			.pipe(map((response: AuthResponseInterface) => response.user))
	}
}
