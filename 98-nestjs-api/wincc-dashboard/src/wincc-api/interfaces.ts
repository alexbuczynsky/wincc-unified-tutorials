
export type Tag = {
  /**
   * Name of the tag
   */
  Name: string
  /**
   * Value of the tag at the moment of the read operation.
   */
  Value: string
  /**
   * Quality of the read operation of the tag
   */
  Quality: 'Good' | 'Bad' | 'Uncertain'
  /**
   * Time stamp of the last successful read operation of the tag
   * @example "1970-01-01 00:00:00.0000000"
   */
  TimeStamp: string
  /**
   * Error code of the last read or write operation of the tag
   */
  Error: number | string
  /**
   * Description of the error code of the last read or
   * write operation of the tag Alarms
   * properties "InstanceID"
   */
  ErrorDescription: string
};

export interface IHMITag extends Tag {
  hasLoaded: boolean;
  Read: () => Promise<void>
}