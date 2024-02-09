export interface JWTPayload {
  userId: string;
  accountType: string;
  email: string;
  iat: number;
  exp: number;
}
