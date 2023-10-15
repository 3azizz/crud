import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb:FormBuilder ,
     public dialog: MatDialogRef<AddTaskComponent> ,
      public matDialog:MatDialog,
      private service:TasksService,
      private toaster:ToastrService,
      private spinner:NgxSpinnerService) { }

  users:any = [

    {name:"Weeri" , id:'652af00908f9dd26c74a4f74'},
    {name:"Dodo" , id:'652b82e26ce1663f79d1a92b'}
  ]

  fileName = ""
  newTaskForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.newTaskForm = this.fb.group({
      title : ['',[ Validators.required,Validators.minLength(5)]],
      userId : ['', Validators.required],
      image : ['', Validators.required],
      describtion : ['', Validators.required],
      deadline : ['', Validators.required]
    })
  }

  createTask(){

    this.spinner.show()
    
    let model = this.prepereFormData()
    this.service.createTask(model).subscribe(res =>{

      console.log(res);

      this.toaster.success("Task created succesfully","succes")
      this.spinner.hide()
      this.dialog.close()
    },error =>{
      this.spinner.hide()
      this.toaster.error(error.error.message)
      
    })
    
  }
  
  prepereFormData(){

    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
  //  this.newTaskForm.get('deadline')?.setValue(newData)
    let formData= new FormData()

    Object.entries(this.newTaskForm.value).forEach(([key , value ] : any )=>{

      if(key == 'deadline'){

        formData.append(key,newData)
      }else{

        formData.append(key,value)
      
      }
      
    }
    
    ) 

    return formData
  }


  selectImage(event:any){

    
    this.fileName =  event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    
  }


}
