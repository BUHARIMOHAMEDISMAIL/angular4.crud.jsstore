import { Injectable } from '@angular/core';
import { Instance } from 'JsStore';
declare var JsStore;

@Injectable()
export class CommonService {
  _connection: Instance;
  _dbName = 'Students';
  constructor() {
    this._connection = new JsStore.Instance();
    JsStore.isDbExist(this._dbName as any).then(isExist => {
      if (isExist) {
        this._connection.openDb(this._dbName, null, null);
      }
      else {
        const DataBase = this.getDatabase();
        this._connection.createDb(DataBase, null, null);
      }
    }).catch(err => {
      // this will be fired when indexedDB is not supported.
      console.error(err);
      alert(err._message);
    });
  }

  private getDatabase() {
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
        DataType: JsStore.Data_Type.String
      },
      {
        Name: 'Gender',
        DataType: JsStore.Data_Type.String,
        Default: 'male'
      },
      {
        Name: 'Country',
        NotNull: true,
        DataType: JsStore.Data_Type.String
      },
      {
        Name: 'City',
        NotNull: true,
        DataType: JsStore.Data_Type.String
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
