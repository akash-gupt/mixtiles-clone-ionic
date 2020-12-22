export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  remember?: boolean;
  roles?: string[];
  mustResetPassword?: boolean;
  iat?: number;
  exp?: number;
}
