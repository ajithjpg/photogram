import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppState } from '../../app.service'
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public postDetails = [];
  public action = '';
  public homeactive = '';
  public exploreactive = '';
  public notificationactive = '';
  public messageactive = '';
  public createactive = '';
  public analyticsactive = '';
  public url = '';
  public feeds_data = [
    { name: 'dilli', post: '../../../assets/img/feed-1.jpg', profile_img: '../../../assets/img/feed-1.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-2.jpg', profile_img: '../../../assets/img/feed-2.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-3.jpg', profile_img: '../../../assets/img/feed-3.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-4.jpg', profile_img: '../../../assets/img/feed-4.jpg', post_desc: '' },
    { name: 'dilli', post: '../../../assets/img/feed-5.jpg', profile_img: '../../../assets/img/feed-5.jpg', post_desc: '' },
  ];

  public chat_data = [
    { name: 'dilli', profile_img: '../../../assets/img/feed-1.jpg', msg: 'Hiii' },
    { name: 'dilli', profile_img: '../../../assets/img/feed-2.jpg', msg: 'Hello' },
    { name: 'dilli', profile_img: '../../../assets/img/feed-3.jpg', msg: 'Hello' },
    { name: 'dilli', profile_img: '../../../assets/img/feed-4.jpg', msg: 'Hello' },
    { name: 'dilli', profile_img: '../../../assets/img/feed-5.jpg', msg: 'Hiiii' },
  ];
  selectedFile = [];
  imageUrl;
  imageshow = 0;
  desc = '';
  constructor(
    public router: Router,
    public appstate: AppState,
    private cd: ChangeDetectorRef
  ) {

  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.action = action[1];

    if (this.action == 'home') {
      if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
        var id = localStorage.getItem("user_id");
        this.getpost(id);
      }
    }

    var action = window.location.pathname.split('/');
    this.url = action[1];
    this.route_change(this.url);
  }

  onFileSelected(event: any) {
    this.selectedFile = [];
    this.selectedFile.push(event.target.files[0]);
    console.log(this.selectedFile);
    this.image_render(event);
  }

  image_render(event) {
    this.imageshow = 1;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  getpost(id) {
    this.appstate.getmethod('posts//all/' + id, '').subscribe(res => {
      if (res.code == 0) {
        if(res.data.length !=0){
          this.postDetails = res.data
        }
      } else {

      }
    })
  }
  route_change(type: any) {
    this.appstate.action = type;
    if (type == 'home') {
      this.homeactive = 'active'
      this.router.navigate(["/home"]);
    } else {
      this.homeactive = ''
    }
    if (type == 'explore') {
      this.exploreactive = 'active';
      this.router.navigate(["/explore"]);
    } else {
      this.exploreactive = '';
    }
    if (type == 'notification') {
      this.notificationactive = 'active';
      this.router.navigate(["/notification"]);
    } else {
      this.notificationactive = '';
    }
    if (type == 'message') {
      this.messageactive = 'active';
      this.router.navigate(["/message"]);
    } else {
      this.messageactive = '';
    }
    if (type == 'Create_post') {
      this.createactive = 'active';
      this.router.navigate(["/Create_post"]);
    } else {
      this.createactive = ''
    }
    if (type == 'analytics') {
      this.analyticsactive = 'active';
      this.router.navigate(["/analytics"]);
    } else {
      this.analyticsactive = '';
    }
    if (type == 'profile') {
      this.router.navigate(["/profile"]);
    }
  }

  create_post() {

    const params = new FormData();
    params.append('user_id', localStorage.getItem('user_id'));
    params.append('post_text', this.desc);
    params.append('file', this.selectedFile[0]);

    this.appstate.postMethod(params, 'posts/upload', '').subscribe(res => {
      if (res.code == 0) {
        this.router.navigate(["/home"]);
      } else {

      }

    }, err => {
      if (err.status == 401) {
        this.appstate.signout();
      }
    })
  }

}


