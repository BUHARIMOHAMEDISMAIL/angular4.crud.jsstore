import { Injectable } from '@angular/core';
import { Instance } from 'JsStore';
declare var JsStore: any;

@Injectable()
export class CommonService {
  _connection: Instance;
  _dbName = 'Students';
  constructor() {
    this._connection = new JsStore.Instance();
    let That = this;
    JsStore.isDbExist(this._dbName).then(isExist => {
      if (isExist) {
        That._connection.openDb(That._dbName);
      }
      else {
        const DataBase = That.getDatabase();
        That._connection.createDb(DataBase);
      }
    }).catch(err => {
      // this will be fired when indexedDB is not supported.
      alert(err.Message);
    });
  }

  private getDatabase = function () {
    const TblStudent = {
      Name: 'Student',
      Columns: [{
        Name: 'Id',
        PrimaryKey: true,
        AutoIncrement: true
      },
      {
        Name: 'Name',
        NotNull: true,
        DataType: 'string'
      },
      {
        Name: 'Gender',
        DataType: 'string',
        Default: 'male'
      },
      {
        Name: 'Country',
        NotNull: true,
        DataType: 'string'
      },
      {
        Name: 'City',
        NotNull: true
      }
      ]
    };
    const DataBase = {
      Name: this._dbName,
      Tables: [TblStudent]
    };

    return DataBase as any;
  }

}
