import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {RouterLink} from "@angular/router";
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
  }
}
