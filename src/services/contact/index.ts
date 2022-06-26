import axios from "@api";

export async function getContact(): Promise<any> {
  const url = "/contact";
  return axios.get(url);
}

export async function postContact(data: any): Promise<any> {
  const url = "/contact";
  return axios.post(url, data);
}

export async function deleteContact(id: any): Promise<any> {
  const url = `/contact/${id}`;
  return axios.delete(url);
}

export async function getContactById(id: any): Promise<any> {
  const url = `/contact/${id}`;
  return axios.get(url);
}

export async function updateContact(id: any, data: any): Promise<any> {
  const url = `/contact/${id}`;
  return axios.put(url, data);
}
