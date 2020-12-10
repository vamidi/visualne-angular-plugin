import { Type } from '@angular/core';
import { Plugin, NodeEditor, Connection } from 'visualne';
import { PluginParams } from 'visualne/types/core/plugin';
import { AngularControl, ElementProps, AngularComponentData } from './types';
import { NodeComponent } from './node/node.component';

export declare type AngularPluginParams<T extends NodeComponent = any> = PluginParams & { component?: Type<T> };

/**
 * Angular renderer class
 * this class will work for the angular framework.
 *
 */
class AngularRenderer extends Plugin
{
  name: string = 'angular-render';

  constructor(editor: NodeEditor ,props: AngularPluginParams = {})
  {
    super(editor);

    this.initialize(editor, props);
  }

  protected initialize(editor: NodeEditor, params: AngularPluginParams): void
  {
    editor.on('rendernode', ({ el, node, component, bindControl, bindSocket }) => {
      const ngComponent = component as unknown as AngularComponentData;

      if (ngComponent.render && ngComponent.render !== 'angular') return;

      const element = document.createElement('visualne-element');
      const props: ElementProps = element as any;

      props.component = ngComponent.component || params.component || NodeComponent;
      props.props = Object.assign({}, ngComponent.props || {}, {
        node,
        editor,
        bindControl,
        bindSocket
      });

      el.appendChild(element);
    });

    editor.on('rendercontrol', ({ el, control }) => {
      const ngControl = control as unknown as AngularControl;

      if (ngControl.render && ngControl.render !== 'angular') return;

      const element = document.createElement('visualne-element');
      const props: ElementProps = element as any;

      props.component = ngControl.component;
      props.control = ngControl;
      props.props = Object.assign({}, ngControl.props || {});

      el.appendChild(element);
    });

    editor.on(['connectioncreate','connectioncreated', 'connectionremoved'], (connection: Connection) =>
    {
      connection.output.node.update();
      connection.input.node.update();

    });
    editor.on(['nodeselected', 'nodedeselected'], () => {
      editor.nodes.forEach(n => n.update());
    });
  }
}

export const AngularRenderPlugin = AngularRenderer;

export { VisualNEModule } from './module';
export * from './types';
export { NodeService } from './node.service';
export { NodeComponent } from './node/node.component';
export { SocketComponent } from './socket/socket.component';
