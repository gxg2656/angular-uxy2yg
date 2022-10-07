import { Component } from '@angular/core';
import { makeDataObjects } from './make-data-objects';

@Component({
  selector: 'my-app',
  template: `
    <kendo-chart>
      <kendo-chart-series>
        <kendo-chart-series-item
          type="heatmap"
          [data]="data"
          [color]="'#6169A2'">
        </kendo-chart-series-item>
      </kendo-chart-series>
      <kendo-chart-x-axis>
        <kendo-chart-x-axis-item [categories]="categories.x">
        </kendo-chart-x-axis-item>
      </kendo-chart-x-axis>
    </kendo-chart>
  `
})
export class AppComponent {
  public data = makeDataObjects();
  public categories = {
    x: ["Below Min", "Min", "Min to Mid", "Mid", "Mid to Max", "Max", "Above Max"]
  };
  
}
