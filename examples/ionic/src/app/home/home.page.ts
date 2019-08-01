import { Component } from '@angular/core';
import zoobc from 'zoobc';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list = [];

  constructor() {
    this.getBlocks().then(data => {
      this.list = data.blocksList;
      console.log(data.blocksList);
    });
  }

  getBlocks() {
    zoobc.connection('http://18.139.3.139:7001');
    const a = zoobc.getBlocks(0, 5, 1);
    return a;
  }
}
