import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import PocketBase from "pocketbase";
import {apiUrl} from "../../app.config";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  pb = new PocketBase(apiUrl);

  subject: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.loadSubject();
  }

  loadSubject(): void {
    this.pb.collection('subjects').getOne(this.post.subject).then((record) => {
      this.subject = record['title'];
    }).catch((error) => {
      console.error('Error fetching subject', error);
    });
  }
}
