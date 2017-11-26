import { Instance } from 'JsStore';
declare var JsStore: any;

export class BaseService {
  _connection: Instance;

  constructor() {
    this._connection = new JsStore.Instance();
    let That = this,
      DatabaseName = 'Students';

    JsStore.isDbExist(DatabaseName).then(isExist => {
      if (isExist) {
        That._connection.openDb(DatabaseName);
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
      Name: 'Students',
      Tables: [TblStudent]
    };

    return DataBase as any;
  }

}