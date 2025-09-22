import AxiosConfig from "../axiosConfig";

const RESOURCE = "/Books";

export async function getAllBooks() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}
