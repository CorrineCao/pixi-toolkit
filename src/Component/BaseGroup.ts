import { Container } from 'pixi.js';

declare interface BaseGroupType {
  label: string;
}

export default class BaseGroup extends Container {

  constructor(options: BaseGroupType) {
    super();
    this.label = options.label;
    this.visible = true;
    this.sortableChildren = true;
    this.interactiveChildren = true;
  }

  closeInteractive = () => {
    this.interactiveChildren = false;
  };

  openInteractive = () => {
    this.interactiveChildren = true;
  };

  closeChildInteractive = () => {
    this.children.forEach(evChild => {
      evChild.interactive = false;
    });
  };

  openChildInteractive = () => {
    this.children.forEach(evChild => {
      evChild.interactive = true;
    });
  };
}
