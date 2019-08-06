import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { FormatsService } from './services/formats.service';
import { UtilsService } from './services/utils.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PlaneService } from './services/plane.service';
import { ProcessService } from './services/process.service';
import { Camera } from '@ionic-native/camera/ngx';
import { MaterialsPageModule } from './pages/materials/materials.module';
import { ReviewOrderPageModule } from './pages/review-order/review-order.module';
import { NewMaterialPageModule } from './pages/new-material/new-material.module';
import { EditMaterialPageModule } from './pages/edit-material/edit-material.module';
import { Downloader } from '@ionic-native/downloader/ngx';
import { NewUserPageModule } from './pages/new-user/new-user.module';
import { EditUserPageModule } from './pages/edit-user/edit-user.module';
import { EditCustomerPageModule } from './pages/edit-customer/edit-customer.module';
import { NewCustomerPageModule } from './pages/new-customer/new-customer.module';
import { EditLocationPageModule } from './pages/edit-location/edit-location.module';
import { NewLocationPageModule } from './pages/new-location/new-location.module';
import { NewPlanePageModule } from './pages/new-plane/new-plane.module';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EditPlanePageModule } from './pages/edit-plane/edit-plane.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MaterialsPageModule,
    ReviewOrderPageModule,
    NewMaterialPageModule,
    EditMaterialPageModule,
    EditUserPageModule,
    NewUserPageModule,
    EditCustomerPageModule,
    NewCustomerPageModule,
    EditLocationPageModule,
    NewLocationPageModule,
    NewPlanePageModule,
    EditPlanePageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    InAppBrowser,
    Downloader,
    AuthService,
    AdminService,
    FormatsService,
    UtilsService,
    PhotoViewer,
    PlaneService,
    ProcessService,
    Camera,
    File,
    FilePath,
    FileChooser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
