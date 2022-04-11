import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth, AuthCredential } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AsideComponent } from './aside/aside.component';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MessageComponent } from './message/message.component';
import { InputfieldComponent } from './inputfield/inputfield.component';
import { ThreadComponent } from './thread/thread.component';
import { MainComponent } from './main/main.component';
import { AngularFireStorageModule, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DataService } from './data.service';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadManagerComponent } from './upload-manager/upload-manager.component';
import { DropzoneDirective } from './directives/dropzone.directive';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    AsideComponent,
    ChatComponent,
    FooterComponent,
    SearchbarComponent,
    MessageComponent,
    InputfieldComponent,
    ThreadComponent,
    SignupComponent,
    VerifyEmailComponent,
    DialogAddChannelComponent,
    UploadManagerComponent,
    DropzoneDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    

    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    
    
  ],
  providers: [ScreenTrackingService, UserTrackingService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
