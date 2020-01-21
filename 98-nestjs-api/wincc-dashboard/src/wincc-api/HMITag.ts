import { Tag } from "./interfaces";
import moment from 'moment';

export class HMITag implements Tag {

  public static Clone(tag: HMITag): HMITag {
    const newTag = new HMITag(tag.Name);
    newTag.Value = tag.Value;
    newTag.Quality = tag.Quality;
    newTag.TimeStamp = tag.TimeStamp;
    newTag.Error = tag.Error;
    newTag.ErrorDescription = tag.ErrorDescription;
    newTag.hasLoaded = tag.hasLoaded;
    newTag.Read = tag.Read;
    return newTag;
  }

  public Name: string;
  public Value: string = '';
  public Quality: "Good" | "Bad" | "Uncertain" = 'Uncertain';
  public TimeStamp: string = '';
  public Error: string | number = 0;
  public ErrorDescription: string = '';
  public hasLoaded: boolean = false;

  constructor(name: string) {
    this.Name = name;
  }


  public async Read(): Promise<void> {
    this.hasLoaded = true;
  };

  public update(tag: Partial<Tag>) {
    Object.assign(this, tag)
    return this;
  }

  public clone() {
    return HMITag.Clone(this);
  }

  public get Date() {
    return moment.utc(this.TimeStamp, 'YYYY-MM-DD HH:mm:ss.SSSSSSS')
  }


}