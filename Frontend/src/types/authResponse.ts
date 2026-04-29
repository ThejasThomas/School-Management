export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
    token: string;
  };
}
export interface ISignUpResponse {
  success: boolean;
  data: {
    user: any;
    token: string;
  };
}
