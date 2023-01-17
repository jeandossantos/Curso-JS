import { ViewComponent } from '../../shared/base/viewComponent.mjs';
import { TableBrowserComponent } from './table.mjs';

export default class BrowserFactory extends ViewComponent {
  createTable() {
    return new TableBrowserComponent();
  }
}
