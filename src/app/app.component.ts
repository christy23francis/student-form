import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form!: FormGroup;
  studentList = [{firstName: "Leo", lastName: "Messi", rollNumber: 10, age: 34, gender: "Male"},{firstName: "David", lastName: "Beckham", rollNumber: 23, age: 44, gender: "Male"}, {firstName: "Cristiano", lastName: "Ronaldo", rollNumber: 7, age: 36, gender: "Male"}]
  isUpdate = false;
  itemIndex: any;
  constructor() {
    this.initForm();
    this.studentList.sort((a, b) => a.rollNumber < b.rollNumber ? -1 : a.rollNumber > b.rollNumber ? 1 : 0);
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      rollNumber: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }

  prefill(data: any) {
    this.isUpdate = true;
    this.form.get("firstName")!.setValue(data.firstName);
    this.form.get("lastName")!.setValue(data.lastName);
    this.form.get("rollNumber")!.setValue(data.rollNumber);
    this.form.get("age")!.setValue(data.age);
    this.form.get("gender")!.setValue(data.gender);
    this.itemIndex = this.studentList.findIndex(item => item.rollNumber == this.form.value.rollNumber && item.firstName == this.form.value.firstName);
  }

  addNew() {
    this.isUpdate = false;
    this.initForm();
  }

  submit() {
    if (this.isUpdate) {
      this.studentList[this.itemIndex] = this.form.value;
      this.isUpdate = false;
    } else {
      this.studentList.push(this.form.value);
    }
    this.studentList.sort((a, b) => a.rollNumber < b.rollNumber ? -1 : a.rollNumber > b.rollNumber ? 1 : 0);
    this.initForm();
  }

}
