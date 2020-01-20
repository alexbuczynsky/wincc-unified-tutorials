import { Tag } from "./interfaces";

const API_BASE_URL = 'http://localhost:4000';



export async function readTags(tagNames: ReadonlyArray<string>): Promise<Tag[]> {

  const body = {
    Tags: tagNames,
  };

  const response = await fetch(API_BASE_URL + '/tags/bulk', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const data: Tag[] = await response.json();
  console.log({ data, body })
  return data;
}

export async function readTag(tagName: string): Promise<Tag> {

  const response = await fetch(API_BASE_URL + `/tags/single/${tagName}`)

  const data: Tag = await response.json();

  return data;
}