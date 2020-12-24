export type FacebookImageType = {
  picture: string;
  images: ImageType[];
  height: number;
  width: number;
  id: string;
};

export type ImageType = {
  height: number;
  source: string;
  width: number;
};

export interface FacebookPhotoResponse {
  data: FacebookImageType[];
  paging: Paging;
}

export interface Paging {
  cursors: Cursors;
}

export interface Cursors {
  before: string;
  after: string;
}
