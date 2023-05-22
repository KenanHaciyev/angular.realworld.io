import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RegisterComponent } from "./components/register/register.component"
import { RouterModule, Routes } from "@angular/router"
import { ReactiveFormsModule } from "@angular/forms"
import { StoreModule } from "@ngrx/store"
import { reducers } from "./store/auth.reducers"
import { EffectsModule } from "@ngrx/effects"
import { RegisterEffects } from "./store/effects/register.effects"
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backend-error-messages.module"
import { PersistanceService } from "../shared/services/persistance.service"
import { AuthService } from "./services/auth.service"
import { LoginEffects } from "./store/effects/login.effects"
import { LoginComponent } from "./components/login/login.component"
import { GetCurrentUserEffects } from "./store/effects/getCurrentUser.effects"

export const routes: Routes = [
	{
		path: "register",
		component: RegisterComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
]

@NgModule({
	declarations: [RegisterComponent, LoginComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		BackendErrorMessagesModule,
		EffectsModule.forFeature([
			RegisterEffects,
			LoginEffects,
			GetCurrentUserEffects,
		]),
		StoreModule.forFeature("auth", reducers),
	],
	providers: [AuthService, PersistanceService],
})
export class AuthModule {}
