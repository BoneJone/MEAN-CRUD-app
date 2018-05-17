import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post: any;
  angForm: FormGroup;
  // title = 'Edit Posts';

  constructor(private route: ActivatedRoute, private router: Router, private postsService: PostsService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      body: ['', Validators.required ]
    });
  }

  updatePost(title, body) {
    this.route.params.subscribe(params => {
      this.postsService.updatePost(title, body, params['id']);
      this.router.navigate(['index']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.post = this.postsService.editPost(params['id']).subscribe(res => {
        this.post = res;
      });
    });
  }

}
