import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppMaterialModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //this.form.value.name = null;
  }

  onSubmite() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(
        (data) => this.onSuccess(),
        (error) => this.onError()
      );
    } else {
      this._snackBar.open('Formulário inválido. Verifique os campos.', '', {
        duration: 3000,
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open('Salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }
}
