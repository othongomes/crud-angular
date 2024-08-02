import { GithubService } from './../../service/github.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private GithubService: GithubService) {

  }
  ngOnInit(): void {
      this.GithubService.getUsuarios().subscribe({
        next: (response) => {
          console.log(response);
        }
      })
  }
}
