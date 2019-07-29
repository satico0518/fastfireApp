import { Injectable } from '@angular/core';
import { ProcessEnum } from '../enums/process.enum';
import {
  PhotoViewerOptions,
  PhotoViewer
} from '@ionic-native/photo-viewer/ngx';
import {
  Downloader,
  DownloadRequest,
  NotificationVisibility
} from '@ionic-native/downloader/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class UtilsService {
  constructor(
    private pv: PhotoViewer,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private downloader: Downloader,
  ) {}
  getTitleByProcess(process: ProcessEnum): string {
    let title = '';
    switch (process) {
      case ProcessEnum.Inpection:
        title = 'Inspección';
        break;
      case ProcessEnum.Planes:
        title = 'Planos';
        break;
      case ProcessEnum.SiteTest:
        title = 'Prueba en Sitio';
        break;
      case ProcessEnum.DailyReport:
        title = 'Avance Diario';
        break;
      case ProcessEnum.AssignLocsToUser:
        title = 'Autorizar Locaciones';
        break;
      case ProcessEnum.CheckHistInspLoc:
      case ProcessEnum.CheckHistInspOper:
        title = 'Histórico de Inspecciones';
        break;
      case ProcessEnum.CheckHistReportLoc:
      case ProcessEnum.CheckHistReportOper:
        title = 'Histórico de Avances';
        break;
      default:
        break;
    }
    return title;
  }

  goToViewer(img) {
    const ops: PhotoViewerOptions = {
      share: true
    };
    this.pv.show(img, 'Visor de imagenes FastFire', ops);
  }

  presentLoading(msg: string): Promise<HTMLIonLoadingElement> {
    return new Promise(resolve => {
      this.loadingCtrl
        .create({
          message: msg,
          spinner: 'crescent'
        })
        .then(loader => {
          loader.present();
          resolve(loader);
        });
    });
  }

  presentToast(msg: string): Promise<HTMLIonToastElement> {
    return new Promise(resolve => {
      this.toastCtrl
        .create({
          message: msg,
          duration: 2000,
          position: 'bottom'
        })
        .then(toast => {
          toast.present();
          resolve(toast);
        });
    });
  }

  downloadFile(uri, title, ext) {
    const request: DownloadRequest = {
      uri,
      title,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: title + ext
      }
    };

    this.downloader
      .download(request)
      .then(() => this.presentToast('Documento descargado con exito!'))
      .catch((error: any) => console.error(error));
  }
}
