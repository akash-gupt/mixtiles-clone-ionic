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
  file: string;
  frameType: string;
};

export const Endpoints = {
  LOGIN: `${environment.endpointUrl}/auth/signin`,
  REGISTER: `${environment.endpointUrl}/auth/create-account`,
  CREATE_FILE: `${environment.endpointUrl}/files/create`,
  UPLOAD_FILE: `${environment.endpointUrl}/files/upload`,
} as const;
