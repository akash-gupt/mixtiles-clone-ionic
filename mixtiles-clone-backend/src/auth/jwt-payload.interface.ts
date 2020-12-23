export interface JwtPayload {
  id: number;
  email: string;
  remember?: boolean;
  iat?: number;
  exp?: number;
}
