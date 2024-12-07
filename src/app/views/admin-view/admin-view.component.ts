import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuItem } from 'primeng/api';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AvatarModule } from 'primeng/avatar';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexFill,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexGrid,
  ApexYAxis
} from 'ng-apexcharts';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle,
  fill?: ApexFill,
  legend?: ApexLegend,
  grid?: ApexGrid
};

export type donutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    NgApexchartsModule,
    CardModule,
    MenubarModule,
    MatToolbarModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss',
})

export class AdminViewComponent {
  productos: any = [];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public miniChartOptions: Partial<ChartOptions>;
  public donutChartOptions: Partial<donutChartOptions>;

  constructor() {
    this.donutChartOptions = {
      series: [44, 55, 41, 17, 15],
      chart: {
        width: '100%',
        height: 305,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      title: {
        text: "Sales by Category"
      },
      legend: {
        position: 'bottom',
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  
  
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 290,
        width: '100%',
        type: "area"
      },
      title: {
        text: "Summary Sales"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };

    this.miniChartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 150,
        width: '100%',
        type: "area",
        toolbar: {
          show: false // Deshabilita los botones
        }
      },
      title: {
        text: "",
      },
      tooltip: {
        enabled: false
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: false // Oculta las líneas de fondo
      },
      xaxis: {
        labels: {
          show: false // Oculta las etiquetas del eje X
        },
        axisTicks: {
          show: false // Oculta las marcas del eje X
        },
        axisBorder: {
          show: false // Oculta el borde del eje X
        }
      },
      yaxis: {
        labels: {
          show: false // Oculta las etiquetas del eje Y
        },
        axisTicks: {
          show: false // Oculta las marcas del eje Y
        },
        axisBorder: {
          show: false // Oculta el borde del eje Y
        }
      },
    };
  
  }
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home'
          },
          {
              label: 'Features',
              icon: 'pi pi-star'
          },
          {
              label: 'Projects',
              icon: 'pi pi-search',
              items: [
                  {
                      label: 'Components',
                      icon: 'pi pi-bolt'
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server'
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil'
                  },
                  {
                      label: 'Templates',
                      icon: 'pi pi-palette',
                      items: [
                          {
                              label: 'Apollo',
                              icon: 'pi pi-palette'
                          },
                          {
                              label: 'Ultima',
                              icon: 'pi pi-palette'
                          }
                      ]
                  }
              ]
          },
          {
              label: 'Contact',
              icon: 'pi pi-envelope'
          }
      ]
  }

}
