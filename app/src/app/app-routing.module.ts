import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat/:id', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'create-channel', component: DialogAddChannelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
