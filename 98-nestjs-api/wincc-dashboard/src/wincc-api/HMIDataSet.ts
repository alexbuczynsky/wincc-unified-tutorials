import { HMITagSet } from "./HMITagSet";

type NumberDataType =
  | 'Byte'
  | 'DInt'
  | 'DWord'
  | 'Int'
  | 'LInt'
  | 'LReal'
  | 'LWord'
  | 'Real'
  | 'SInt'
  | 'UDInt'
  | 'UInt'
  | 'ULInt'
  | 'USInt'
  | 'Word'

type BooleanDataType =
  | 'Bool'

type StringDataType =
  | 'WString'
  | 'WChar'

type CastDataType<T> =
  T extends NumberDataType ? number :
  T extends BooleanDataType ? boolean :
  T extends StringDataType ? string : string;


type DataType = BooleanDataType | NumberDataType | StringDataType

interface DataSetTag {
  RefName: string;
  DataType: DataType;
}

type TagMap = Record<string, DataSetTag>

export class HMIDataSet<T extends TagMap> extends HMITagSet {

  static Clone<DS extends HMIDataSet<{}>>(dataSet: DS): DS {

    const newTagSet = new HMIDataSet(dataSet.registeredTags);
    newTagSet.hash = dataSet.hash;
    newTagSet.postReadCb = dataSet.postReadCb;
    newTagSet.fetchedAt = dataSet.fetchedAt;
    return newTagSet as DS;
  }

  static Factory<T extends TagMap>(map: T) {
    return new HMIDataSet(map);
  }

  private readonly registeredTags: T;

  constructor(tags: T) {
    super()
    const tagNames = Object.values(tags).map(x => x.RefName)
    this.genMap(tagNames);
    this.registeredTags = tags;
  }

  public getTag(name: keyof T) {
    const { DataType, RefName } = this.registeredTags[name];
    return [this.ItemUnsafe(RefName), DataType] as const;
  }

  public getValue<N extends keyof T>(name: N): CastDataType<T[N]['DataType']> {

    const [tag, dataType] = this.getTag(name);

    const value = tag.Value;

    let parsedValue: any = value;

    switch (dataType) {
      case 'Bool':
        parsedValue = (value === 'TRUE');
        break;
      case 'Byte':
      case 'DInt':
      case 'DWord':
      case 'Int':
      case 'LInt':
      case 'LReal':
      case 'LWord':
      case 'Real':
      case 'SInt':
      case 'UDInt':
      case 'UInt':
      case 'ULInt':
      case 'USInt':
      case 'Word':
        parsedValue = Number(value);
        break;
      case 'WChar':
      case 'WString':
        parsedValue = String(value);
        break;
    }
    return parsedValue;
  }

  public Clone() {
    return HMIDataSet.Clone(this);
  }
}