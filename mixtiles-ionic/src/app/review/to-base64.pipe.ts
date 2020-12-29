import { Pipe, PipeTransform } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Pipe({
  name: 'toBase64',
})
export class ToBase64Pipe implements PipeTransform {
  constructor(private file: File) {}

  transform(value: string, ...args: unknown[]) {
    if (!value) {
      return value;
    }

    let img = null;

    this.file
      .resolveLocalFilesystemUrl(value)
      .then((entry: any) => {
        entry.file((file1) => {
          var reader = new FileReader();
          reader.onload = (encodedFile: any) => {
            var src = encodedFile.target.result;
            img = src;
          };
          reader.readAsDataURL(file1);

          return img;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
