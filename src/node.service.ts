import { Injectable } from '@angular/core';
import { BindControl, BindSocket } from './types';

@Injectable()
export class NodeService {
  public bindSocket: BindSocket;
  public bindControl: BindControl;
  
  setBindings(bindSocket: BindSocket, bindControl: BindControl) {
    this.bindSocket = bindSocket;
    this.bindControl = bindControl;
  }
}
