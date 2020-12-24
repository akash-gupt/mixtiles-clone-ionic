import { Injectable } from '@angular/core';
import { FACEBOOK_PERMISSIONS } from 'src/app/app.constant';
import { FacebookPhotoResponse } from './types';
import { Instagram, OauthCordova } from 'ionic-cordova-oauth';

@Injectable()
export class IgService {
  private oauth: OauthCordova = new OauthCordova();
  private instagramProvider: Instagram = new Instagram({
    clientId: '905863833554626',
    appScope: ['email'],
  });

  constructor() {}

  async login(): Promise<boolean> {
    this.oauth.logInVia(this.instagramProvider).then(
      (success) => {
        console.log('SUCCESS: ', success);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
    return false;
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
