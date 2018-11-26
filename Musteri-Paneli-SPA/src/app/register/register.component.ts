import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,
    FormGroup,
    Validators,
    FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,
    private formBuilder:FormBuilder) { }

    registerForm:FormGroup;
    UserRegister:any={}
    
  ngOnInit() {
    this.CreateRegisterForm();
  }

  CreateRegisterForm(){
    this.registerForm=this.formBuilder.group({
      userName:["",Validators.required],
      password:["",[Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)]],
      confirmPassword:["",Validators.required]
    },
    {validator:this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password').value=== g.get('confirmPassword').value?
    null:{misMatch:true}
  }

  register(){
    this.registerForm.valid
    {
      this.UserRegister=Object.assign({},this.registerForm.value);
      this.authService.register(this.UserRegister);
    };
  }

}