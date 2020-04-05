import { Component, OnInit } from '@angular/core';
import zoobc from 'zoobc';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  account: any;
  title = 'angular app';
  networks = [
    {
      host: 'http://85.90.246.90:8002',
      name: 'dev',
    },
  ];

  constructor() {
    zoobc.Network.list(this.networks);
  }

  ngOnInit() {
    this.getBalance();
  }

  async getBalance() {
    const address = 'B9C35tu6hJCE7IrwqL5uxnh6OW77Pw99JIdrSpHMg2Ki';
    const balance = await zoobc.Account.getBalance(address).then((res: any) => {
      this.account = res.accountbalance;
    });
  }
}
