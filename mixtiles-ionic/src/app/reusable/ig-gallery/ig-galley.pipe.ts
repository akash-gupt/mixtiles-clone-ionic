import { Pipe, PipeTransform } from '@angular/core';
import { FacebookPhotoResponse } from './types';

@Pipe({
  name: 'igGalley',
})
export class IgGalleyPipe implements PipeTransform {
  transform(values: FacebookPhotoResponse['data']): unknown {
    if (!values) {
      return;
    }

    return values.map((o) => o.picture);
  }
}
