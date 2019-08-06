import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'page-check-inspections',
  templateUrl: 'check-inspections.html'
})
export class CheckInspectionsPage implements OnInit {
  inspections: any[];

  constructor(
    private router: Router,
    private admSrvc: AdminService,
    public us: UtilsService
  ) {}

  ngOnInit() {
    this.us.presentLoading('cargando inspecciones...').then(loader => {
      this.admSrvc.getCreatedInspections().subscribe(list => {
        this.inspections = list;
        loader.dismiss();
      }, err => loader.dismiss());
    });
  }

  goToDetail(insp) {
    this.router.navigate(['orderdetailpage'], { state: { insp }});
  }
}
