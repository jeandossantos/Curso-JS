import { ViewComponent } from '../../shared/base/viewComponent.mjs';
import { TableConsoleComponent } from './table.mjs';

export default class ConsoleFactory extends ViewComponent {
  createTable() {
    return new TableConsoleComponent();
  }
}
