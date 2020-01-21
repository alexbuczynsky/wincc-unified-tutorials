import { HMITag } from "./HMITag";
import { readTags } from "./requests";
import { Tag } from "./interfaces";
import moment from 'moment';

type CallBack = () => any;

export class HMITagSet {

  /** Function to call after reading data */
  public postReadCb?: CallBack

  public fetchedAt?: moment.Moment

  public static Clone(tagSet: HMITagSet) {
    const newTagSet = new HMITagSet();
    newTagSet.hash = tagSet.hash;
    newTagSet.postReadCb = tagSet.postReadCb;
    newTagSet.fetchedAt = tagSet.fetchedAt;
    return newTagSet;
  }

  public static CreateSetWithCustomRead(readFuncRef: CallBack) {
    const newTagSet = new HMITagSet();
    newTagSet.postReadCb = readFuncRef;
    return newTagSet;
  }

  protected hash: Map<string, HMITag> = new Map();

  constructor(...tagNames: string[]) {
    this.genMap(tagNames);
  }

  protected genMap(names: string[]) {
    for (const name of names) {
      this.hash.set(name, new HMITag(name));
    }
  }

  /**
   * Add tag to set
   */
  public Add(tagName: string) {
    this.hash[tagName] = new HMITag(tagName);
  }

  /**
   * Access HMITag in the set
   * 
   * @param name - either name of the tag or index (1...n)
   */
  public Item(name: string) {
    return this.hash.get(name);
  }

  protected ItemUnsafe(name: string) {
    const item = this.Item(name);
    if (!item) {
      throw new Error('ITEM_NOT_FOUND with name=' + name)
    }
    return item;
  }

  /**
   * Removes all tags from set
   */
  public Clear() {
    this.hash.clear();
  }

  /**
   * Number of tags in set
   */
  public Count() {
    return this.hash.size;
  }

  /**
   * Returns the names of the tags in the set
   */
  public get Names() {
    return Array.from(this.hash.keys());
  }

  /**
   * Update a tag in the set
   */
  public Update(name: string, tag: Partial<Tag>) {

    const hmiTag = this.hash.get(name);

    if (hmiTag) {
      hmiTag.update(tag);
      hmiTag.hasLoaded = true;
    }
  }

  /**
   * Read all tag values from WinCC
   */
  public async Read() {
    const tags = await readTags(this.Names);

    this.fetchedAt = moment();

    if (!Array.isArray(tags)) {
      console.error('TAGS ARE NOT AN ARRAY')
      return
    }

    for (const tag of tags) {
      this.Update(tag.Name, tag);
    }

    console.log({ postReadCb: this.postReadCb })

    if (this.postReadCb) {
      this.postReadCb()
    }
  }

  public Clone() {
    return HMITagSet.Clone(this);
  }

  public AsArray(): HMITag[] {
    return Array.from(this.hash.values());
  }


}