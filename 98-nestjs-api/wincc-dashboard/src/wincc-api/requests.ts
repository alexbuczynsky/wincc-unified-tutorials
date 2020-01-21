import { Tag, IUserConfig, DeepPartial } from "./interfaces";
import queryString from 'query-string'

const API_BASE_URL = 'http://localhost:4000';



export async function readTags(tagNames: ReadonlyArray<string>): Promise<Tag[]> {

  const query = queryString.stringify({
    'Tags': tagNames,
  })

  const response = await fetch(`${API_BASE_URL}/tags/bulk?${query}'`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data: Tag[] = await response.json();
  return data;
}

export async function readTag(tagName: string): Promise<Tag> {

  const response = await fetch(API_BASE_URL + `/tags/single/${tagName}`)

  const data: Tag = await response.json();

  return data;
}

export async function readUserConfig(username: string): Promise<IUserConfig> {

  const url = new URL(`${API_BASE_URL}/user-config/${username}`);

  const response = await fetch(url.toString())

  const data: IUserConfig = await response.json();
  return data;
}

export async function saveUserConfig(username: string, config: DeepPartial<IUserConfig>): Promise<IUserConfig> {
  const body = config;

  const response = await fetch(`${API_BASE_URL}/user-config/${username}`, {
    method: 'put',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data: IUserConfig = await response.json();
  return data;
}