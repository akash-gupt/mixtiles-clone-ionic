import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { FACEBOOK_PERMISSIONS } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private fb: Facebook, private ig: Instagram) {}

  async handleFb() {
    const success = await this.loginFb();
    if (success) {
      await this.getPhotos();
    }
  }

  private loginFb(): Promise<boolean> {
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

  private async getPhotos() {
    const photos = await this.fb.api(
      'me/photos/uploaded?fields=picture,album,images,height,width',
      FACEBOOK_PERMISSIONS
    );
    // console.log(photos);
  }
}
