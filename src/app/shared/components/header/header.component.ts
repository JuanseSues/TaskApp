import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {

  @Input() title: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;

  constructor(
    private themeService: ThemeService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {}

  dismissModal(){
    this.utilSvc.dismissModal()
  }

}
