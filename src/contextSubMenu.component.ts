import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'context-submenu',
  template: `
    <ul *ngIf="ownFocus || parentFocus"
        [ngStyle]="locationCss"
        (mouseenter)="ownFocus = true"
        (mouseleave)="ownFocus = false">
       <li *ngFor="let link of links" 
          [class.disabled]="link.enabled && !link.enabled(item)"
          (click)="link.click(item, $event); $event.preventDefault(); $event.stopPropagation(); onClick.emit();"
          (mouseenter)="focus = links.indexOf(link)"
          (mouseleave)="focus = -1">
          <context-submenu *ngIf="link.actions" 
            [links]="link.actions"
            [parentFocus]="focus == links.indexOf(link)"
            (onClick)="onClick.emit()"></context-submenu>
          {{link.html(item)}}
        </li>
    </ul>
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
export class ContextSubMenuComponent {
  @Output()
  onClick = new EventEmitter<void>();
  
  @Input()
  links: any;

  @Input()
  parentFocus: boolean;

  ownFocus: boolean;
  focus: number;

  display:string = 'none';

  get locationCss(): any {
    return {
      'position': 'absolute',
      'margin-left': '100%'
    };
  }
}
