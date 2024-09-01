import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-dash-nav',
  standalone: true,
  imports: [MdbCollapseModule, RouterLink],
  templateUrl: './dash-nav.component.html',
  styleUrl: './dash-nav.component.scss'
})
export class DashNavComponent {

}
