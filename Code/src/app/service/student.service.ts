import { Injectable } from '@angular/core';
import { CommonService } from '../service/common.service';

@Injectable()
export class StudentService {
  _connection;
  constructor(service: CommonService) {
    this._connection = service._connection;
  }

  getStudents = function () {
    // jsstore returns promise, when you dont specify OnSuccess
    return this._connection.select({
      From: 'Student'
    });
  }

  addStudent = function (student) {
    return this._connection.insert({
      Into: 'Student',
      Values: [student]
    });
  }

  deleteStudent = function (studentId) {
    return this._connection.delete({
      From: 'Student',
      Where: {
        Id: studentId
      }
    });
  }

  updateStudent = function (studentId, updateValue) {
    return this._connection.update({
      In: 'Student',
      Where: {
        Id: studentId
      },
      Set: updateValue
    });
  }

  getStudent = function (studentId) {
    return this._connection.select({
      From: 'Student',
      Where: {
        Id: studentId
      }
    });
  }
}