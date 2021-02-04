// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import { Component, OnInit } from '@angular/core';
import zoobc from 'zoobc';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hosts = [
    {
      host: 'http://85.90.246.90:8002',
      name: '168 Testnet',
    },
  ];

  list = [];

  constructor() {
    zoobc.Network.list(this.hosts);
  }

  ngOnInit() {
    this.getBlocks();
  }

  async getBlocks() {
    try {
      const res = await zoobc.Block.getBlocks({ height: 0 });
      if (res) {
        this.list = res.blocksList;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
