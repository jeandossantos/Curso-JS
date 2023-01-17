import { NotImplementedException } from '../notImplementedException.mjs';

export class ViewComponent {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
}
