import { Component } from '@angular/core';
import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [ArticlesDisplayComponent, HttpClientModule,CarouselModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
 /* animations: [
    trigger('enterState', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          750,
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
    trigger('enterStateTwo', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          1500,
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
  ] */
})
export class MainViewComponent {
  
  responsiveOptions: any[] | undefined;

  imgsBanner: string[] = [
    'https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/92614a5c-e516-4e0e-a65b-120d21f22ce2___a7ecee8e94e86636a3f0bd4daafc0bc0.jpg',
    'https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/243d4e15-90cf-4daa-a6b1-1ce4f184c9e8___87e632cd2de7e6af1fc3c788a7daa33c.jpg',
    'https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/c5638ae7-4bc9-4299-a3b5-9d486b0718ee___fd3194b53058e08d3f0b2387f1b987c2.jpg',
    'https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/71e0cb4f-de62-4028-ba90-014cc4c3932a___c215980dc6255478786345c4c1e687c5.jpg',
    'https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/467f2f25-4788-413f-a599-3fef2c5da8d4___eda1c921ff02ba58cf67678e71cd873d.jpg'
  ]

  ngOnInit() {
    
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }

}
