import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  loginForm!:FormGroup
  ngOnInit(): void {
    this.creatForm()
  }


  creatForm(){

    this.loginForm= this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    })
  }

  login(){
    console.log(this.loginForm.value);
  }
}
