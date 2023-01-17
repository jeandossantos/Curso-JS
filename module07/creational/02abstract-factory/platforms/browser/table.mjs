import { TableComponent } from '../../shared/base/tableComponent.mjs';

export class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML('afterBegin', template);
  }

  prepareData(data) {
    const [firstItem] = data;

    const THeaders = Object.keys(firstItem).map(
      (header) => `<th scope=col>${header}</th>`
    );

    const tBodyValues = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${tds.join('')}</tr>`);

    const template = `
        <table class="table">
        <thead>
        <tr>${THeaders.join('')}</tr>
        </thead>
        <tbody>${tBodyValues.join('')}</tbody>
      `;

    return template;
  }
}
