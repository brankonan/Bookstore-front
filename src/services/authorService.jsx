import AxiosConfig from "../axiosConfig";

const RESOURCE = "/Authors";

export async function getAllAuthors() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}
