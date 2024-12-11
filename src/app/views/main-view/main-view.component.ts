import { Component } from '@angular/core';
import { ArticlesDisplayComponent } from '../../shared/components/public/articles-display/articles-display.component';
import { CarouselModule } from 'primeng/carousel';
import { IMGS_BANNER_HEADER } from '../../common/constants';
@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [ArticlesDisplayComponent, CarouselModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {

  public IMGS_BANNER_HEADER = IMGS_BANNER_HEADER;

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
