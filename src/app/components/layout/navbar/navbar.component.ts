import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, MdbDropdownModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  loginservice = inject(LoginService);

  actionsNav = [
    {
      text: "GREEN PRODUTOS",
      icon: 'fa-biohazard',
      url: 'produto',
      isExternal: false
    },
    {
      text: "SERVIÇOS",
      icon: 'fa-tools',
      url: 'produto',
      isExternal: false
    }
  ]

  actionsCategoria = [
    {
      text: "Placa de Video",
      url: '#',
      isExternal: false
    },
    {
      text: "Processador",
      url: '#',
      isExternal: false
    },
    {
      text: "Placa Mãe",
      url: '#',
      isExternal: false
    }
  ]
}
