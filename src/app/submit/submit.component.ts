import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { FormRestService } from '../restService/form-rest.service';
import { format } from 'url';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})

export class SubmitComponent implements OnInit {
  submitForm: FormGroup;
  submitted = false;

  private postService: FormRestService

  constructor(formService: FormRestService, private formBuilder: FormBuilder) {
    this.postService = formService;
  }

  ngOnInit(): void {
    
    this.submitForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required],
      model: ['', Validators.required],
      service: ['Automazgāšana', Validators.required],
      quality: ['Zelta', Validators.required],
      time: ['10:00', Validators.required],
      date: [''],
      comments: ['']
    });
    
  }

  get fval() {
    return this.submitForm.controls;
  }

  submitData(){
    this.submitted = true;

    if (this.submitForm.invalid) {
      alert("Forma nav pareizi aizpildīta!");
      return;
    }
  
    let formObj = this.submitForm.getRawValue(); 

    let serializedForm = JSON.stringify(formObj);

    let resp = this.postService.postItems(serializedForm);

    alert("Pieteikums nosūtīts!");

  }


}
