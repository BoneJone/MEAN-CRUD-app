import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  result: any;

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get('/api/posts')
      // .map(res => res.json());
  }

  addPost(title, body) {
    const uri = 'http://localhost:3000/api/add';
    const obj = {
      title: title,
      body: body
    };
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }
//muutettu
  getPosts() {
    const uri ='http://localhost:3000/api';
    return this.http.get(uri).map(res => {
      return res;
    });
  }

  editPost(id) {
    const uri = 'http://localhost:3000/api/edit/' + id;
    return this.http.get(uri).map(res => {
      return res;
    });
  }

  updatePost(title, body, id) {
    const uri = 'http://localhost:3000/api/update/' + id;

    const obj = {
      title: title,
      body: body
    };
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }

  deletePost(id) {
    const uri = 'http://localhost:3000/api/delete/' +id;
      return this.http.get(uri).map(res => {
        return res;
      });
  }
}
