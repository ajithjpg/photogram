import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { AppState } from '../../app.service'
import { Router } from '@angular/router';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';


  public profiledata;
  public postDetails = [];
  public action = '';
  public homeactive = '';
  public exploreactive = '';
  public notificationactive = '';
  public messageactive = '';
  public createactive = '';
  public analyticsactive = '';
  public url = '';
  view_follow = ''
 

  selectedFile = [];
 post_image_url = ''
  imageUrl;
  imageshow = 0;
  desc = '';
  explore_data = [];
  closeResult: string;
  @ViewChild('content') private modalContent: TemplateRef<DashboardComponent>
  @ViewChild('staticBackdrop') private infoContent: TemplateRef<DashboardComponent>
  private modalRef: NgbModalRef
  commend_txt = '';
  viewdata;
  viewdata_comments = [];
  local_user_id = 0;
  chat_list = [];
  constructor(
    public router: Router,
    public appstate: AppState,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
    if(!isNullOrUndefined(localStorage.getItem('user_id'))){
      this.local_user_id = JSON.parse(localStorage.getItem('user_id')) 
    }else{
      this.local_user_id = 0
    }
  }
  ngOnInit(): void {
    var action = window.location.pathname.split('/');
    this.action = action[1];

    if (this.action == 'home') {
      if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
        var id = localStorage.getItem("user_id");
        this.getpost(id);
        // this.getprofile()
      }
    }

    if (this.action == 'explore') {
      if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
        var id = localStorage.getItem("user_id");
        this.explore_list();
      }
    }

    if(this.action =='message'){
      this.getchatlist();
    }


    var action = window.location.pathname.split('/');
    this.url = action[1];
    this.route_change(this.url);
  }

  shownotify(){
    this.appstate.showNotification('Web Notification', {
      body: 'This is a web notification from your Angular app!'
    })
  }

  getchatlist(){
    this.appstate.getmethod('message/chat/user_list','').subscribe(res =>{
      if(res.code == 0){
        if(res.data.length !=0){
          this.chat_list = res.data
          var user_id = JSON.parse(localStorage.getItem('user_id')) 
          if(this.chat_list.length !=0){
            for (let i = 0; i < this.chat_list.length; i++) {

              if(this.chat_list[i]['user1_id'] != user_id ){
                this.chat_list[i]['profile_id'] = this.chat_list[i]['user1_id']
              }else if(this.chat_list[i]['user2_id'] != user_id){
                this.chat_list[i]['profile_id'] = this.chat_list[i]['user2_id']
              }
             
              
            }
          }
        }else{
          this.chat_list = []
        }
      }else{
        this.chat_list = []
      }
    })
  }

  viewpost(id) {
    this.appstate.getmethod('view_posts/getdata/' + id, '').subscribe(res => {
      if (res.code == 0) {
        this.view_follow = res.isfollow
        console.log(this.view_follow)
        this.viewdata = res.data[0];
        if (!isNullOrUndefined(res.comments)) {
          if (res.comments.length != 0) {
            this.viewdata_comments = res.comments
          } else {
            this.viewdata_comments = []
          }
        } else {
          this.viewdata_comments = []
        }

        this.modalRef = this.modalService.open(this.modalContent, { size: 'xl' })
        this.modalRef.result.then((res)=>{
          this.getpost(res.data[0]['user_id']);
        })
      }
    }, err => {
      if (err.status == 401) {
        this.appstate.signout();
      }
    })
  }

  shownt(){
    this.modalRef = this.modalService.open(this.infoContent, { size: 'xl' })
    this.modalRef.result.then()
    
  }

  onFileSelected(event: any) {
    this.selectedFile = [];
    this.selectedFile.push(event.target.files[0]);
    console.log(this.selectedFile);
    this.image_render(event);
  }

  closemodel(){
    this.modalRef.close()
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
    console.log(event)
    this.post_image_url = event.objectUrl

  }

  getSanitizedURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  view_profile(id) {
    this.modalRef.close()
    this.router.navigate(['/profile', id])
  }

  addcommend(post_id) {

    if(this.commend_txt !=''){
      var datas = {
        'comment_text': this.commend_txt
      }
      this.commend_txt = '';
      if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
        var user_id = localStorage.getItem("user_id");
        this.appstate.postMethod(datas, 'posts/commend/' + post_id + '/' + user_id, '').subscribe(res => {
          if (res.code == 0) {
            this.modalRef.close();
            this.viewpost(post_id);
          }
    
        }, err => {
          if (err.status == 401) {
            this.appstate.signout();
          }
        })
      }
    }else{
      this.appstate.showError('Enter Your Comment');
    }
    
   
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
    this.appstate.getmethod('posts/all/' + id, '').subscribe(res => {
      if (res.code == 0) {
        if (res.data.length != 0) {
          this.postDetails = res.data;
          // if(this.postDetails.length !=0){
          //   for (let i = 0; i < this.postDetails.length; i++) {
          //     this.postDetails[i]['img_url'] = this.getSanitizedURL(this.postDetails[i]['img_url'])
          //   }
          // }
        }else{
          this.postDetails = [];
        }
      } else {

      }
    }, err => {
      if (err.status == 401) {
        this.appstate.signout();
      }
    })
  }

  uplike(i, post_id, user_id) {

    if (this.postDetails.length != 0) {
      this.postDetails[i]['islike'] = 1;
      this.postDetails[i]['likes'] = this.postDetails[i]['likes'] + 1;
      this.appstate.postMethod('', 'posts/like/' + post_id + '/' + user_id, '').subscribe(res => {
        if (res.code == 0) {

        }
      }, err => {
        if (err.status == 401) {
          this.appstate.signout();
        }
      })
    }

  }

  downlike(i, post_id, user_id) {
    if (this.postDetails.length != 0) {
      this.postDetails[i]['islike'] = 0;
      this.postDetails[i]['likes'] = this.postDetails[i]['likes'] - 1;
      this.appstate.postMethod('', 'posts/dislike/' + post_id + '/' + user_id, '').subscribe(res => {
        if (res.code == 0) {

        }
      }, err => {
        if (err.status == 401) {
          this.appstate.signout();
        }
      })
    }

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
      var id = localStorage.getItem('user_id')
      this.router.navigate(["profile/", id]);
    }
  }

  create_post() {
   console.log(this.croppedImage)
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

  explore_list() {
    this.appstate.getmethod('posts/allposts', '').subscribe(res => {
      if (res.code == 0) {
        this.explore_data = res.data
      }
    }, err => {
      if (err.status == 401) {
        this.appstate.signout();
      }
    })
  }

  getprofile() {
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      var id = localStorage.getItem("user_id");

      this.appstate.getmethod('getprofile/' + id, '').subscribe(res => {
        console.log(res);
        if (res.code == 0) {
          this.profiledata = res.data
        }
      }, err => {
        if (err.status == 401) {
          this.appstate.signout();
        }
      })
    }
  }

  follow(id){
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      var user_id = localStorage.getItem("user_id"); 
      this.appstate.postMethod('','user/follow/'+ user_id+'/'+id,'').subscribe(res =>{

      }, err => {
        if (err.status == 401) {
          this.appstate.signout();
        }
      })
    }
   
  }

  unfollow(id){
    if (!isNullOrUndefined(localStorage.getItem('user_id'))) {
      var user_id = localStorage.getItem("user_id"); 
      this.appstate.postMethod('','user/follow/'+ user_id+'/'+id,'').subscribe(res =>{

      }, err => {
        if (err.status == 401) {
          this.appstate.signout();
        }
      })
    }
   
  }
}


