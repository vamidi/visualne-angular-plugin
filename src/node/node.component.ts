import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { NodeEditor, Node } from 'visualne';
import { NodeService } from '../node.service';
import { BindControl, BindSocket } from '../types';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  providers: [NodeService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent implements OnInit {
  @Input() editor!: NodeEditor;
  @Input() node!: Node;
  @Input() bindSocket!: BindSocket;
  @Input() bindControl!: BindControl;

  constructor(protected service: NodeService, protected cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    this.service.setBindings(this.bindSocket, this.bindControl);
    this.node.update = () => this.cdr.detectChanges();
  }

  get inputs() {
    return Array.from(this.node.inputs.values());
  }

  get outputs() {
    return Array.from(this.node.outputs.values());
  }

  get controls() {
    return Array.from(this.node.controls.values());
  }

  selected() {
    return this.editor.selected.contains(this.node) ? 'selected' : '';
  }
}
