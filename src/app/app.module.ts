import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { AuthModule } from "./auth/auth.module"
import { StoreModule } from "@ngrx/store"
import { StoreDevtoolsModule } from "@ngrx/store-devtools"
import { environment } from "../environments/environment"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { EffectsModule } from "@ngrx/effects"
import { TopBarModule } from "./shared/modules/topBar/top-bar.module"
import { PersistanceService } from "./shared/services/persistance.service"
import { AuthInterceptorService } from "./shared/services/auth-interceptor.service"
import { GlobalFeedModule } from "./global-feed/global-feed.module";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store"

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		HttpClientModule,
		StoreModule.forRoot({router: routerReducer}, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		EffectsModule.forRoot([]),
		TopBarModule,
		GlobalFeedModule,
		StoreRouterConnectingModule.forRoot(),
	],
	providers: [
		PersistanceService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
