import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { FACEBOOK_PERMISSIONS } from 'src/app/app.constant';
import { FacebookPhotoResponse } from './types';

@Injectable()
export class FbService {
  constructor(private fb: Facebook, private ig: Instagram) {}

  loginFb(): Promise<boolean> {
    return new Promise((resolve) => {
      this.fb.getLoginStatus().then((v) => {
        if (!v) {
          this.fb
            .login(FACEBOOK_PERMISSIONS)
            .then((res: FacebookLoginResponse) => {
              console.log('Logged into Facebook!', res);
              resolve(true);
            })
            .catch((e) => {
              console.log('Error logging into Facebook', e);
              resolve(false);
            });
        } else {
          console.log('Logged into already!', v);
          resolve(true);
        }
      });
    });
  }

  async paginatePhotos(after: string = null): Promise<FacebookPhotoResponse> {
    let url = `me/photos/uploaded?fields=picture,images,height,width&limit=20`;

    if (after) {
      url = url + `&after=${after}`;
    }

    const photos: FacebookPhotoResponse = await this.fb.api(
      url,
      FACEBOOK_PERMISSIONS
    );

    return photos;
  }
}
