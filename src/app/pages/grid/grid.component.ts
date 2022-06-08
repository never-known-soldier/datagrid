import { Component, ViewChild } from '@angular/core';
import DataGrid from "devextreme/ui/data_grid";
import { DxDataGridComponent } from 'devextreme-angular';
import { ProductService } from '../../shared/services';
import * as events from 'devextreme/events';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [ProductService]
})
export class GridListComponent {
  @ViewChild('dataGridRef', { static: false }) dataGrid: DxDataGridComponent;

  dataSource: any;
  isExpanded: boolean;
  changes: any;
  editRowKey: any;
  rowType: number;
  rowTypes: number[];
  selectedRowIndex = -1;
  productSoure: any;
  sessionSoure: any;
  nameSoure: any;
  directionSource: any;
  prevRowVal: any

  constructor(public productService: ProductService) {
    this.dataSource = [
      {
        "id": "1",
        "alias": "m0",
        "product": "product 1",
        "session": "Session 1",
        "direction": "Send",
        "name": "name 1",
        "superClass": "D",
        "type": "type 1",
        "message": "Message doesn't exist",
        "rowType": 0
      },
      {
        "id": "2",
        "validationInfo": [
          {
            "message": "message data",
            "condition": "validation(m0)",
            "name": "VenueAccountValidation"
          },
          {
            "message": "message data1",
            "condition": "validation(m1)",
            "name": "VenueAccountValidation"
          }
        ],
        "parentAlias": "",
        "after": false,
        "variantName": null,
        "rowType": 1
      },
      {
        "id": "3",
        "parentAlias": "",
        "testCaseInfos": [
          {
            "name": "MessageTestcase 1"
          },
          {
            "name": "MessageTestcase 2"
          }
        ],
        "after": false,
        "variantName": null,
        "rowType": 3
      },
      {
        "id": "4",
        "alias": "m0",
        "product": "product 1",
        "session": "Session 1",
        "direction": "Verify",
        "name": "name 1",
        "superClass": "D",
        "type": "type 1",
        "message": "Message doesn't exist",
        "rowType": 0
      },
      {
        "id": "5",
        "snippetText": "Snippet text 1",
        "rowType": 2
      },
      {
        "id": "6",
        "alias": "m1",
        "product": "product 2",
        "session": "Session 2",
        "direction": "Get",
        "name": "name 1",
        "superClass": "D",
        "type": "type 1",
        "message": "Message doesn't exist",
        "rowType": 0
      }
    ];
    this.isExpanded = false;
    this.changes = [];
    this.rowType = 0;
    this.rowTypes = [...Array(4).keys()];
    this.productSoure = [
      {

        "product": "product 1",
        "sessions": [
          "Session 1",
          "Session 1-1",
          "Session 1-2",
          "Session 1-3",
          "Session 1-4",
          "Session 1-1",
          "Session 1-5",
          "Session 1-6"
        ]
      },
      {

        "product": "product 2",
        "sessions": [
          "Session 2",
          "Session 2-1",
          "Session 2-2",
          "Session 2-3",
          "Session 2-4",
        ]
      },
      {

        "product": "product 3",
        "sessions": [
          "Session 3",
          "Session 3-1",
          "Session 3-2",
          "Session 3-3",
          "Session 3-4"
        ]
      }
    ];
    this.getFilteredCities = this.getFilteredCities.bind(this);
    this.directionSource = ["Send", "Verify", "Get"];
  }

  onRowPrepared(info: any) {
    if (info.data) {
      if (info.data.rowType === 0 && info.cells[0] && info.cells[0].cellElement) {
        info.cells[0].cellElement.classList.remove('dx-datagrid-expand');
        info.cells[0].cellElement.childNodes[0].classList.remove('dx-datagrid-group-closed');
      } else if ([1, 2, 3].includes(info.data.rowType)) {
        info.rowElement.style.backgroundColor = '#4f8ad924';
        info.rowElement.classList.remove("dx-column-lines");
      }
    }
  }

  calculateDisplayValue(data: any) {
    if (data && data.hasOwnProperty('rowType')) {
      switch (data.rowType) {
        case 1:
          return 'Validations';
        case 2:
          return 'Snippet';
        case 3:
          return 'TestCases'
        default:
          return data.alias;
      }
    }
  }

  onGridInitialized(e: { component: DataGrid<any, any>; }) {
    // this.dataGrid = e.component;
  }

  onCollapseExpandClick() {
    this.isExpanded = !this.isExpanded;
    this.dataSource.forEach((row: any, index: number) => {
      if (row.rowType > 0) {
        if (this.isExpanded) {
          this.dataGrid.instance.expandRow(row.id);
        } else {
          this.dataGrid.instance.collapseRow(row.id);
        }
      }
    });
  }
  onContextMenuPreparing(e: any) {
    const items: any = [
      {
        text: "Menu Item 1",
        onClick: () => {
          e.component.cancelEditData();
        }
      },
      {
        text: "Menu Item 2",
        onClick: () => {
          e.component.cancelEditData();
        }
      }
    ];
    e.items = items;
  }
  onRowInserting(e: any) {
    e.data.rowType = this.rowType;
    e.data.id = 3;
  }
  onRowInserted(e: any) {
    e.component.navigateToRow(e.key);
  }
  onEditingStart(e: any) {
    if (e.data) {
      if ([1, 2, 3].includes(e.data.rowType)) {
        e.cancel = true;
      } else if (e.data.product) {
        this.prevRowVal = { ...e.data };
        this.productSoure.forEach((row: any) => {
          if (row.product === e.data.product) {
            this.sessionSoure = row.sessions;
            this.productService
              .getProductList(e.data.product)
              .subscribe((data: any) => {
                this.nameSoure = data;
              });
          }
        });
      }
    }
  }
  onRowTypesClick(e: any) {
    this.rowType = e.value;
  }
  selectedChanged(e: any) {
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
  }
  async insertAfter() {
    const index = this.selectedRowIndex;
    const maxId = Math.max(...this.dataSource.map((row: any) => row.id));
    this.dataSource.splice(index + 1, 0, { id: maxId + 1, rowType: this.rowType });
    this.dataGrid.instance.collapseAll(-1);
    await this.dataGrid.instance.refresh();
    this.dataGrid.instance.editRow(index + 1);
  }

  async insertBefore() {
    const index = this.selectedRowIndex;
    const maxId = Math.max(...this.dataSource.map((row: any) => row.id));
    this.dataSource.splice(index, 0, { id: maxId + 1, rowType: this.rowType });
    this.dataGrid.instance.collapseAll(-1);
    await this.dataGrid.instance.refresh();
    this.dataGrid.instance.editRow(index);
  }

  onEditorPreparing(evt: any) {
    if (evt.dataField === "product") {
      const defaultValueChangeHandler = evt.editorOptions.onValueChanged;
      evt.editorOptions.onValueChanged = async (e: any) => {
        this.productSoure.forEach((row: any) => {
          if (row.product === e.value) {
            this.sessionSoure = row.sessions;
            evt.row.data.session = '';
            this.productService
              .getProductList(row.product)
              .subscribe((data: any) => {
                this.nameSoure = data;
              });
            evt.row.data.name = '';
          }
        });
        defaultValueChangeHandler(e);
      }
    } else if (evt.dataField === "name") {
      const component = evt.component;
      const rowIndex = evt.row && evt.row.rowIndex;
      const defaultValueChangeHandler = evt.editorOptions.onValueChanged;

      evt.editorOptions.onValueChanged = async (e: any) => {
        this.productService
          .getNameList(e.value?.name || e.value)
          .subscribe((data: any) => {
            if (data && data.length) {
              setTimeout(() => {
                component.cellValue(rowIndex, "superClass", data[0].superClass);
                component.cellValue(rowIndex, "type", data[0].messageType);
                component.cellValue(rowIndex, "message", data[0].message);
              }, 100);
            }
          });
        e.value = e.value.name;
        setTimeout(() => {
          component.cellValue(rowIndex, "name", e.value.name);
          defaultValueChangeHandler(e);
        }, 100);
      }
    }
    if (evt.parentType === "dataRow" && evt.dataField === "direction") {
      evt.editorOptions.itemTemplate = "directionLookupTemplate";
    }
  }

  getFilteredCities(options: any) {
    return {
      store: this.nameSoure,
      filter: options.data ? ['name', '=', options.data.name] : null,
    };
  }

  calculateNameValue(data: any) {
    if (data.name && data.name.name) {
      return data.name.name
    }
    return data.name;
  }
  async saveData() {
    const gridData = await this.dataGrid.instance.getDataSource().store().load();
    gridData.forEach((row: any) => {
      if (row.name && row.name.name) {
        row['name'] = row.name.name;
      }
      delete row['id'];
    });
    console.log("Grid data after changes:", gridData);
  }

  onCellPrepared(e: any) {
    if (e.rowType === 'data' && e.column.command === 'edit') {
      const editLink = e.cellElement.querySelector('.dx-link-cancel');
      events.on(editLink, 'dxclick', (args: any) => {
        const rowIndex = this.dataGrid.instance.getRowIndexByKey(e.key);
        setTimeout(() => {
          this.dataSource.splice(rowIndex, 1, this.prevRowVal);
        }, 100);
      });
    }
  }

  onFocusedCellChanging = (e: any) => {
    if (["name", "session"].includes(e.columns[e.newColumnIndex].dataField)) {
      e.newColumnIndex += 1;
    }
  }
}