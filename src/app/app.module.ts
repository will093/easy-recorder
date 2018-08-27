import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { MediaStorageService } from '../services/media-storage.service';
import { MyApp } from './app.component';
import { PipesModule } from '../pipes/pipes.module';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'easy-recorder',
    }),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaStorageService,
  ]
})
export class AppModule {}
