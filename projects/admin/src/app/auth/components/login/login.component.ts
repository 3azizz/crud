import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, 
    private service:LoginService,
    private toaster:ToastrService,
    private router:Router) { }

  loginForm!:FormGroup
  ngOnInit(): void {
    this.creatForm()
  }


  creatForm(){

    this.loginForm= this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role: ["admin"]
    })
  }

  login(){
    this.service.login(this.loginForm.value).subscribe(res=>{

      this.toaster.success('success','Login success')
      this.router.navigate(['/tasks'])
    },error=>{

      this.toaster.error(error.error);
      
    })

  }
}
