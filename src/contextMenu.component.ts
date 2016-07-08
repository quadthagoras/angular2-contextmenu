import {Component, HostListener} from '@angular/core';
import {ContextMenuService, IContextMenuClickEvent} from './contextMenu.service';
import {ContextSubMenuComponent} from './contextSubMenu.component';

@Component({
  selector: 'context-menu',
  template:
  `<div class="dropdown angular2-contextmenu">
      <ul [ngStyle]="locationCss" class="dropdown-menu">
        <li *ngFor="let link of links" 
          [class.disabled]="link.enabled && !link.enabled(item)"
          (click)="link.click(item, $event); $event.preventDefault();"
          (mouseenter)="focus = links.indexOf(link)"
          (mouseleave)="focus = -1">
          <context-submenu *ngIf="link.actions" 
            [links]="link.actions"
            [parentFocus]="focus == links.indexOf(link)"
            (onClick)="isShown = false"></context-submenu>
          {{link.html(item)}}
        </li>
      </ul>
    </div>
  `,
  styles: [`
  ul {
    padding: 0;
    list-style-type: none;
    display: block;
    position: absolute;
  }`,
  `
  li {
    cursor: pointer;
    display: list-item;
  }
  `],
  directives: [ContextSubMenuComponent]
})
export class ContextMenuComponent {
  public links: any[] = [];
  public isShown: boolean = false;
  public isOpening: boolean = false;
  public item: any;
  private mouseLocation: { left: number, top: number } = { left: 0, top: 0 };
  private focus: number;

  constructor(private _contextMenuService: ContextMenuService) {
    _contextMenuService.show.subscribe((e: IContextMenuClickEvent) => this.showMenu(e.event, e.actions, e.item));
  }

  get locationCss(): any {
    return {
      'position': 'fixed',
      'display': this.isShown ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
    };
  }

  @HostListener('document:click')
  public clickedOutside(): void {
    if (!this.isOpening) {
      this.isShown = false;
    }
  }

  public showMenu(event: MouseEvent, actions: any[], item: any): void {
    this.isOpening = true;
    setTimeout(() => this.isOpening = false, 400);
    if (actions && actions.length > 0) {
      this.isShown = true;
    }
    this.links = actions;
    this.item = item;
    this.mouseLocation = {
      left: event.clientX,
      top: event.clientY,
    };
  }

  public mouseEnter() {
    console.log(this.focus);
  }
}
