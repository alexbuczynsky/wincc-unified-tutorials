import { useState, useEffect, useCallback } from 'react';
import { readTag, readTags, readUserConfig, saveUserConfig } from './requests';
import { HMITag } from './HMITag';
import { HMITagSet } from './HMITagSet';

import * as DataSets from '../DataSets';
import { HMIDataSet } from './HMIDataSet';
import { IUserConfig, DeepPartial } from './interfaces';

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

/**
 * A more performant variant of `Tags`, since
 * only one request is made to update all tags
 * @param tagNames - name of tags in the set
 */
export const TagSet = (...tagNames: ReadonlyArray<string>): HMITagSet => {

  const [record, setRecord] = useState(new HMITagSet(...tagNames))

  const fetchAll = useCallback(() => {
    setRecord(record.Clone())
  }, [tagNames])

  record.postReadCb = fetchAll

  useEffect(() => {
    record.Read()
  }, [])



  return record;
}

type DataSetClasses = typeof DataSets;
type DataSetNames = keyof typeof DataSets;

export function DataSet<T extends DataSetNames>(dataSetName: T, ...args: Parameters<DataSetClasses[T]>): ReturnType<DataSetClasses[T]> {
  const dataSetClass: any = DataSets[dataSetName];

  if (!dataSetClass) {
    throw new Error('DATA_SET_NOT_DEFINED');
  }

  // const allArgs = args;
  const [record, setRecord] = useState<ReturnType<DataSetClasses[T]>>(dataSetClass(...args))

  const fetchAll = useCallback(() => {
    setRecord(record.Clone())
  }, [dataSetName])

  record.postReadCb = fetchAll

  useEffect(() => {
    record.Read()
  }, [])

  return record;
}

export function UserConfig(username: string) {
  const [config, setConfig] = useState<IUserConfig>({
    username,
    dashboard: {
      widgets: [],
    }
  });

  const fetchConfig = useCallback(async () => {
    const newConfig = await readUserConfig(username)
    setConfig(newConfig);
  }, [username])

  const saveConfig = useCallback(async (newConfig: DeepPartial<IUserConfig>) => {
    await saveUserConfig(username, newConfig);
  }, [username])

  useEffect(() => {
    fetchConfig();
  }, [username])


  return [config, fetchConfig, saveConfig] as const;




}