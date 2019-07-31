import { Component } from '@angular/core';
import zoobc from 'zoobc';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list = this.getBlocks();
  title = 'angular app';

  getBlocks() {
    zoobc.connection('http://18.139.3.139:7001');
    return zoobc.getBlocks(0, 5, 1);
  }
}
