import { Component } from '@angular/core';
import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [ArticlesDisplayComponent, HttpClientModule],
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

}
