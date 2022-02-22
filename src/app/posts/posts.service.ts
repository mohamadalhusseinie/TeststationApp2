import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{ message: string; posts: Post[] }>("http://localhost:3000/api/posts").subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(vorname: string, nachname: string, adresse: string, hausnummer: string, postleitzahl: number, stadt: string, telefonnummer: string, email: string) {
    const post: Post = { vorname: vorname, nachname: nachname, adresse: adresse, hausnummer: hausnummer, postleitzahl: postleitzahl, stadt: stadt, telefonnummer: telefonnummer, email: email };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
