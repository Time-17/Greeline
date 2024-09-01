import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MdbCarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  actions = [
    {
      img: 'home_1.png'
    },
    {
      img: 'home_2.png'
    },
    {
      img: 'home_3.png'
    }
  ]
}
