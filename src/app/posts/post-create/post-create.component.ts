import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.vorname, form.value.nachname, form.value.adresse, form.value.hausnummer, form.value.postleitzahl, form.value.stadt, form.value.telefonnummer, form.value.email );
    form.resetForm();
  }
}
