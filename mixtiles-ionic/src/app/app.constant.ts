import { environment } from 'src/environments/environment';

export const SECRET_KEY: string = 'umachavealeatoria20204444';

export const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

export type FrameType = 'bold' | 'edge';

export type FilterButtonType = {
  iconImage: string;
  title: string;
  id: FrameType;
  selected?: boolean;
};

export type RegisterBody = {
  email: string;
  password: string;
};

export type CreateFileBody = {
  fileNames: string[];
  frameType: string;
};

export type SelectImageEvRes = {
  imageName: string;
  filePath: string;
  base64: string;
};

export type FileUploadResponse = {
  originalname: string;
  filename: string;
  path: string;
  size: number;
};

export type UploadImageType = {
  imagePath: string;
  fileName: string;
};

export const Endpoints = {
  LOGIN: `${environment.endpointUrl}/auth/signin`,
  REGISTER: `${environment.endpointUrl}/auth/create-account`,
  CREATE_FILE: `${environment.endpointUrl}/files/create`,
  UPLOAD_FILE: `${environment.endpointUrl}/files/upload`,
} as const;

export const FACEBOOK_PERMISSIONS = ['user_photos'];
