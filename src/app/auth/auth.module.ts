import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RegisterComponent } from "./components/register/register.component"
import { RouterModule, Routes } from "@angular/router"
import { ReactiveFormsModule } from "@angular/forms"

export const routes: Routes = [
	{
		path: "register",
		component: RegisterComponent,
	},
]

@NgModule({
	declarations: [RegisterComponent],
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AuthModule {}
