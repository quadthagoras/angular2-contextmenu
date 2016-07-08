import {ContextMenuComponent} from './src/contextMenu.component';
import {ContextSubMenuComponent} from './src/contextSubMenu.component';
import {ContextMenuService} from './src/contextMenu.service';

export * from './src/contextMenu.component';
export * from './src/contextMenu.service';
export * from './src/contextSubMenu.component';

export default {
  directives: [
    ContextMenuComponent,
  ],
}
