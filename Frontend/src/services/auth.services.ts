import authAxiosInstance from "../api/axios";
import type { AuthResponse, ISignUpResponse } from "../types/authResponse";
import type { SignupPayload } from "../types/signupPayload";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginService = async (
  payload: LoginPayload
): Promise<AuthResponse["data"]> => {
  const response = await authAxiosInstance.post<AuthResponse>("/login", payload);
  return response.data.data;
};

export const signupService = async (
  payload: SignupPayload
): Promise<ISignUpResponse["data"]> => {
  const response = await authAxiosInstance.post<ISignUpResponse>(
    "/register",
    payload
  );

  return response.data.data;
};