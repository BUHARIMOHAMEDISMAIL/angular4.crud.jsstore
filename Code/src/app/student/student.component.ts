import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student, IStudent } from '../Model/student';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})

export class StudentComponent implements OnInit {
  _students: Array<Student>;
  _newStudent: Student = new Student();
  private _service: StudentService;
  _oldStudent: Student = new Student();

  constructor(service: StudentService) {
    this._service = service;
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents = function () {
    this._service.getStudents().
      then(students => {
        this._students = students;
      }).catch(error => {
        console.error(error);
        alert(error.Message);
      });
  }

  addStudent = function () {
    this._service.addStudent(this._newStudent).
      then(rowsAdded => {
        if (rowsAdded > 0) {
          this._students.push(this._newStudent);
          this.clearNewStudent();
          alert('Successfully added');
        }
      }).catch(error => {
        console.error(error);
        alert(error.Message);
      });
  }

  deleteStudent = function (studentId) {
    this._service.deleteStudent(studentId).
      then(rowsDeleted => {
        if (rowsDeleted > 0) {
          let Index = this._students.findIndex(student => student.Id === studentId);
          this._students.splice(Index, 1);
          alert('Successfully deleted');
        }
      }).catch(error => {
        console.error(error);
        alert(error.Message);
      });
  }

  clearNewStudent = function () {
    this._newStudent = new Student();
  }

  clearOldStudent = function () {
    this._oldStudent = new Student();
  }

  getStudent = function (studentId) {
    this._service.getStudent(studentId).
      then(student => {
        this._oldStudent = student;
      }).catch(error => {
        console.error(error);
        alert(error.Message);
      });
  }

  updateStudent = function () {
    let UpdatedValue = {
      Name: this._oldStudent.Name,
      Gender: this._oldStudent.Gender,
      Country: this._oldStudent.Country,
      City: this._oldStudent.City
    }
    this._service.updateStudent(this._oldStudent.Id, UpdatedValue).
      then(rowsUpdated => {
        if (rowsUpdated > 0) {
          let Index = this._students.findIndex(student => student.Id === this._oldStudent.Id);
          this._students[Index] = this._oldStudent;
          this.clearOldStudent();
          alert('Successfully updated');
        }
      }).catch(error => {
        console.error(error);
        alert(error.Message);
      });
  }
}