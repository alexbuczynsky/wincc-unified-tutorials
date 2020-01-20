import { useState, useEffect, useCallback } from 'react';
import { readTag, readTags } from './requests';
import { HMITag } from './HMITag';

export const Tags = (tagName: string): HMITag => {

  const [tag, setTag] = useState(new HMITag(tagName))

  const fetchTag = async () => {
    try {
      const data = await readTag(tag.Name);
      tag.update(data);
      tag.hasLoaded = true;

      setTag(tag.clone());
    } catch (err) {
      tag.hasLoaded = false;
      tag.ErrorDescription = err.message;
    }
  }

  tag.Read = fetchTag;

  useEffect(() => {
    tag.Read()
  }, [])

  return tag;
}