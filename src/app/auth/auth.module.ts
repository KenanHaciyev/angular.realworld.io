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

export const routes: Routes = [
	{
		path: "register",
		component: RegisterComponent,
	},
]

@NgModule({
	declarations: [RegisterComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		BackendErrorMessagesModule,
		EffectsModule.forFeature([RegisterEffects]),
		StoreModule.forFeature("auth", reducers),
	],
	providers: [AuthService, PersistanceService],
})
export class AuthModule {}
