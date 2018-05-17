import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: any; //= []; //muutettu

  constructor(private http: HttpClient, private service: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.service.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  deletePost(id) {
    this.service.deletePost(id).subscribe(res => {
      console.log('Deleted');
    });
  }

}
