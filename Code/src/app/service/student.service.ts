import { Injectable } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Instance } from 'JsStore';

@Injectable()
export class StudentService {
  _connection: Instance;
  constructor(service: CommonService) {
    this._connection = service._connection;
  }

  getStudents() {
    // jsstore returns promise, when you dont specify OnSuccess
    return this._connection.select({
      From: 'Student'
    });
  }

  addStudent(student) {
    return this._connection.insert({
      Into: 'Student',
      Values: [student]
    });
  }

  deleteStudent(studentId) {
    return this._connection.delete({
      From: 'Student',
      Where: {
        Id: studentId
      }
    });
  }

  updateStudent(studentId, updateValue) {
    return this._connection.update({
      In: 'Student',
      Where: {
        Id: studentId
      },
      Set: updateValue
    });
  }

  getStudent(studentId) {
    return this._connection.select({
      From: 'Student',
      Where: {
        Id: studentId
      }
    });
  }
}
