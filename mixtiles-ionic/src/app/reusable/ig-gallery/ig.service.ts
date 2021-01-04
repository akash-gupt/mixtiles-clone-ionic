import { Injectable } from '@angular/core';
import { FACEBOOK_PERMISSIONS } from 'src/app/app.constant';
import { FacebookPhotoResponse } from './types';

@Injectable()
export class IgService {
  constructor() {}

  async login(username: string, password: string) {
    // return new Promise((resolve) => {
    //   this.fb.getLoginStatus().then((v) => {
    //     if (!v) {
    //       this.fb
    //         .login(FACEBOOK_PERMISSIONS)
    //         .then((res: FacebookLoginResponse) => {
    //           console.log('Logged into Facebook!', res);
    //           resolve(true);
    //         })
    //         .catch((e) => {
    //           console.log('Error logging into Facebook', e);
    //           resolve(false);
    //         });
    //     } else {
    //       console.log('Logged into already!', v);
    //       resolve(true);
    //     }
    //   });
    // });
  }

  async paginatePhotos(after: string = null) {
    return {
      data: [],
    } as any;
  }
}
