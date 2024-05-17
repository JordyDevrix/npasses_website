import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {NgStyle} from "@angular/common";
import { NpassService } from "../npass.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'npassshop';
  public joinForm!: FormGroup;
  public checkForm!: FormGroup;
  public generatetext: string = 'Generate n-word pass';
  public buttonStyle: string = '#007bff';

  constructor(private fb: FormBuilder, private npassService: NpassService, private http: HttpClient) { }

  generatePass() {
    this.npassService.generatePass().subscribe(
      response => {
        console.log('Pass generated successfully:', response);
        // Handle the response here
      },
      error => {
        console.error('Error generating pass:', error);
        // Handle errors here
      }
    );
  }

  ngOnInit() {
    this.joinForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.checkForm= this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    console.log(this.joinForm.value);
    this.generatetext = 'Check your mail';
    this.buttonStyle = '#28a745';
    setTimeout(() => {
      this.generatetext = 'Generate n-word pass';
      this.buttonStyle = '#007bff';
      this.joinForm.get('name')?.setErrors(null);
      this.joinForm.get('email')?.setErrors(null);
      this.joinForm.reset();
    }, 1000);
    this.generatePass();
  }

  onCheck() {
    console.log('Form submitted');
  }

}
