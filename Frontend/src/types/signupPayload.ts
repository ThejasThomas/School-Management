export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher";
}