import axios from "axios";
import { ApiUser } from "../types/User.types";

const API_BASE_URL = "http://3.110.122.127:3000";

interface GetAllUsersResponse {
  message: string;
  count: number;
  users: ApiUser[];
}

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await axios.get<GetAllUsersResponse>(
    `${API_BASE_URL}/getAllUsers`
  );
  return response.data;
};
