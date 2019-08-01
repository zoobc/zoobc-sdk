import { Component, OnInit } from '@angular/core';
import zoobc from 'zoobc';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  list = [];
  title = 'angular app';

  ngOnInit(): void {
    this.getBlocks().then(data => {
      this.list = data.blocksList;
    });
  }

  getBlocks() {
    zoobc.connection('http://18.139.3.139:7001');
    const a = zoobc.getBlocks(0, 5, 1);
    return a;
  }
}
