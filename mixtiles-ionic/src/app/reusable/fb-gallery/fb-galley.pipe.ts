import { Pipe, PipeTransform } from '@angular/core';
import { FacebookPhotoResponse } from './types';

@Pipe({
  name: 'fbGalley',
})
export class FbGalleyPipe implements PipeTransform {
  transform(values: FacebookPhotoResponse['data']): unknown {
    if (!values) {
      return;
    }

    return values.map((o) => o.picture);
  }
}
