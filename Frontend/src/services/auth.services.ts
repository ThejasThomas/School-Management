import authAxiosInstance from "../api/axios";
import type {  ISignUpResponse } from "../types/authResponse";
import type { SignupPayload } from "../types/signupPayload";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginService = async (payload: LoginPayload) => {
  const res = await authAxiosInstance.post("/login", payload);
  return res.data.data;
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