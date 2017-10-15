import { Injectable } from '@angular/core';
import { BaseService } from '../Service/base.service';

@Injectable()
export class StudentService extends BaseService {
  constructor() {
    super();
  }

  getStudents = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'Student'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addStudent = function (student) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'Student',
        Values: [student]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteStudent = function (studentId) {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'Student',
        Where: {
          Id: studentId
        }
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  updateStudent = function (studentId, updateValue) {
    return new Promise((resolve, reject) => {
      this._connection.update({
        In: 'Student',
        Where: {
          Id: studentId
        },
        Set: updateValue
      }, function (rowsUpdated) {
        resolve(rowsUpdated)
      }, function (error) {
        reject(error);
      });
    });
  }

  getStudent = function (studentId) {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'Student',
        Where: {
          Id: studentId
        }
      }, function (results) {
        resolve(results[0])
      }, function (error) {
        reject(error);
      });
    });
  }
}