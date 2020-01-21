declare namespace WinCC {

  export type DataType =
    | 'Bool'
    | 'Byte'
    | 'DateTime'
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
    | 'WChar'
    | 'Word'
    | 'WString'

  export type DataType2JS = {
    Bool: boolean
    Byte: number
    DateTime: Date
    DInt: number
    DWord: number
    Int: number
    LInt: number
    LReal: number
    LWord: number
    Real: number
    SInt: number
    UDInt: number
    UInt: number
    ULInt: number
    USInt: number
    WChar: string
    Word: number
    WString: string
  }


  export enum Language {
    German = 1031,
    English = 1033,
  }

  export namespace OpenPipe {

    export type ErrorCode = string | number;

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
      Error: ErrorCode
      /**
       * Description of the error code of the last read or
       * write operation of the tag Alarms
       * properties "InstanceID"
       */
      ErrorDescription: string
    }

    enum HMIAlarmState {
      Normal = '0',
      Raised = '1',
      RaisedCleared = '2',
      RaisedAcknowledged = '5',
      RaisedAcknowledgedCleared = '6',
      RaisedClearedAcknowledged = '7',
      Removed = '8',
    }

    enum HMIAlarmSourceType {
      Undefined = "0",
      Tag = "1",
      Controller = "2",
      System = "3",
      Alarm = "4",
    }

    enum HMIAlarmNotificationReason {
      Unknown = "0",
      /**
       * The alarm was added to the filtered result list.
       * The alarm meets the filter criteria that apply to
       * the monitoring.
       */
      Add = "1",
      /**
       * Properties of the alarm were changed, but the
       * alarm is still part of the filtered result list.
       */
      Modify = "2",
      /**
       * The alarm was part of the result list, but it no
       * longer meets the filter criteria due to changes
       * to its properties.
       */
      Remove = "3",
    }

    export type HMIAlarm = {
      /**
       * Time of alarm acknowledgment
       * @example "1970-01-01 00:00:00.0000000"
       */
      AcknowledgmentTime: string;
      /**
       * Name of the alarm class
       * @example "Alarm"
       */
      AlarmClassName: string;
      /**
       * Symbol of the alarm class
       * @example "Alarm"
       */
      AlarmClassSymbol: string;
      /**
       * 
       * @example ""
       */
      AlarmText1: string;
      /**
       * 
       * @example ""
       */
      AlarmText2: string;
      /**
       * 
       * @example ""
       */
      AlarmText3: string;
      /**
       * 
       * @example ""
       */
      AlarmText4: string;
      /**
       * 
       * @example ""
       */
      AlarmText5: string;
      /**
       * 
       * @example ""
       */
      AlarmText6: string;
      /**
       * 
       * @example ""
       */
      AlarmText7: string;
      /**
       * 
       * @example ""
       */
      AlarmText8: string;
      /**
       * 
       * @example ""
       */
      AlarmText9: string;
      /**
       * Origin area for display and sorting of the alarm
       * @example ""
       */
      Area: string;
      /**
       * Number with the background color of the alarm state
       * @example "4294967295"
       */
      BackColor: string;
      /**
       * Trigger event for modification of the alarm state
       * @example "3"
       */
      ChangeReason: string;
      /**
       * Time of alarm reset
       * @example "1970-01-01 00:00:00.0000000"
       */
      ClearTime: string;
      /**
       * Connection by which the alarm was triggered
       * @example "1.0.0.0.0.0"
       */
      Connection: string;
      /**
       * Range of the triggering tag in which no alarms are generated.
       * @example "No deadband configured."
       */
      DeadBand: string;
      /**
       * Text that describes the alarm event.
       * @example ""
       */
      EventText: string;
      /**
       * Indicates whether the alarm is flashing.
       * @example "FALSE"
       */
      Flashing: 'TRUE' | 'FALSE';
      /**
       * Name of the host that triggered the alarm.
       * @example "md1z5cpc"
       */
      HostName: string;
      /**
       * ID of the alarm that is also used in the display.
       * @example "0"
       */
      ID: string;
      /**
       * Text that describes an operator instruction for the alarm.
       * @example ""
       */
      InfoText: string;
      /**
       * InstanceID for an alarm with multiple instances
       * @example "9"
       */
      InstanceID: string;
      /**
       * Function that navigates from the alarm view to its origin.
       * @example ""
       */
      LoopInAlarm: string;
      /**
       * Time of the last modification to the alarm state
       * @example "2019-01-30 11:25:39.9780320"
       */
      ModificationTime: string;
      /**
       * Name of the alarm
       * @example "RUNTIME_1::Tag_2:Alarm1"
       */
      Name: string;
      /**
       * Reason for the notification
       * 
       * Note: Changes to the alarm only lead to notifications
       * again when the alarm meets the filter criteria again.
       * In this case, "NotificationReason" is set to Add.
       * @example "1"
       */
      NotificationReason: HMIAlarmNotificationReason;
      /**
       * Origin for display and sorting of the alarm
       * @example ""
       */
      Origin: string;
      /**
       * Relevance for display and sorting of the alarm
       * 
       * @example "1"
       */
      Priority: string;
      /**
       * Trigger time of the alarm
       * @example "2019-01-30 11:25:39.9780320"
       */
      RaiseTime: string;
      /**
       * Time of alarm reset
       * @example "1970-01-01 00:00:00.0000000"
       */
      ResetTime: string;
      /**
       * Source at which the alarm was triggered
       * @example ""
       */
      SourceID: string;
      /**
       * Source from which the alarm was generated, e.g. tag-based, controller-based or system-based alarm.
       * @example "1"
       */
      SourceType: HMIAlarmSourceType;
      /**
       * Current alarm state
       * @example "1"
       */
      State: HMIAlarmState;
      /**
       * 
       * @example "7"
       */
      StateMachine: string;
      /**
       * Current alarm state as text, for example "Incoming" or "Outgoing"
       * @example "R"
       */
      StateText: string;
      /**
       * Status of alarm visibility
       * @example "0"
       */
      SuppressionState: string;
      /**
       * Severity of the system error
       * @example "0"
       */
      SystemSeverity: string;
      /**
       * 
       * @example "RUNTIME_1::Tag_2"
       */
      Tag: string;
      /**
       * Number with the text color of the alarm state
       * @example "4278190080"
       */
      TextColor: string;
      /**
       * User name of the operator input alarm
       * @example ""
       */
      UserName: string;
      /**
       * Current process value of the alarm
       * @example "7"
       */
      Value: string;
      /**
       * Limit of the process value of the alarm
       * @example "No limit configured."
       */
      ValueLimit: string;
      /**
       * Quality of the process value of the alarm
       * @example "192"
       */
      ValueQuality: string;
      /**
       * ID of the alarm group to which the alarm belongs.
       * @example "1
       */
      AlarmGroupID: string;
    }

    /**
     * 
     */
    export type HMIError<T = "ErrorUnknown"> = {
      Message: T
      ClientCookie: Cookie
      ErrorCode: ErrorCode
      /**
       * Description of the error code of the last read or write operation of the tag
       */
      ErrorDescription: string
    }

    export type Cookie = string;

    export type SystemNames = string;

    export namespace Actions {

      type Request = {
        Message: string
        ClientCookie: Cookie
        Params?: Record<string, any>
      }

      type OnSuccess = {
        Message: string
        ClientCookie: Cookie
        Params?: Record<string, any>
      }

      type OnError = {
        Message: string
        ClientCookie: Cookie
        ErrorCode: string | number
        /**
         * Description of the error code of the last read or write operation of the tag
         */
        ErrorDescription: string
      }

      type Action = {
        Request: Request,
        OnSuccess: OnSuccess,
        OnError: OnError,
      }

      /**
       * The "SubscribeTag" command subscribes one or more tags for monitoring. The following
       * properties are monitored:
       * - Tag value
       * - Quality
       * - Quality code
       * - Time stamp
       * 
       * "NotifiySubscribeTag" always returns all monitored tags,
       * even if only the value of one monitored tag changes.
       * The change can be a change to the quality code, time
       * stamp or tag value. The order of tags in the response
       * corresponds to the order in the "SubscribeTag" request.
       * 
       * It is permitted to have the same tag monitored by
       * multiple "SubscribeTag" calls.
       */
      export interface SubscribeTag extends Action {
        Request: {
          Message: "SubscribeTag",
          ClientCookie: Cookie,
          Params: {
            Tags: string[],
          },
        },
        OnSuccess: {
          Message: "NotifySubscribeTag",
          ClientCookie: Cookie,
          Params: {
            Tags: Tag[]
          },
        },
        OnError: HMIError<"ErrorSubscribeTag">,
      }

      /**
       * The "UnsubscribeTag" command unsubscribes a tag
       * from monitoring that was started with the
       * cookie transferred in the call of "SubscribeTag".
       */
      export interface UnsubscribeTag extends Action {
        Request: {
          Message: "UnsubscribeTag",
          ClientCookie: Cookie,
        },
        OnSuccess: {
          Message: "NotifyUnsubscribeTag",
          ClientCookie: Cookie,
        },
        OnError: HMIError<"ErrorUnsubscribeTag">
      }

      /**
       * The "ReadTag" command reads multiple tags. The tag value,
       * the quality, the quality code and the time stamp are signaled.
       * The order of tags in the response corresponds to
       * the order in the "ReadTag" request.
       */
      export interface ReadTag extends Action {
        Request: {
          Message: "ReadTag",
          ClientCookie: Cookie,
          Params: {
            Tags: string[],
          },
        },
        OnSuccess: {
          Message: "NotifyReadTag",
          ClientCookie: Cookie,
          Params: {
            Tags: Tag[]
          }
        },
        OnError: HMIError<"ErrorReadTag">
      }

      /**
       * The "WriteTag" command writes the values of multiple tags.
       */
      export interface WriteTag extends Action {
        Request: {
          Message: "WriteTag",
          ClientCookie: Cookie,
          Params: {
            Tags: {
              TagName: string,
              Value: string,
            }[]
          },
        },
        OnSuccess: {
          Message: "NotifyWriteTag",
          ClientCookie: Cookie,
          Params: {
            Tags: {
              Name: string,
              ErrorCode: ErrorCode,
              ErrorDescription: string
            }[]
          }
        },
        OnError: HMIError<"ErrorWriteTag">
      }

      /**
       * The "SubscribeAlarm" command subscribes systems for monitoring of changes of active
       * alarms.
       * 
       * During the first call of "NotifySubscribeAlarm", all active alarms are queried.
       * Thereafter, "NotifySubscribeAlarm" is only called when the status of an alarm
       * changes.
       */
      export interface SubscribeAlarm extends Action {
        Request: {
          Message: "SubscribeAlarm",
          /**
           * Is used for "UnsubscribeAlarm" and to assign the notification to its monitoring.
           */
          ClientCookie: Cookie,
          Params: {
            /**
             * When the list is empty or missing, all known systems are subscribed for monitoring.
             */
            SystemNames?: SystemNames[],
            /**
             * @example "AlarmClassName != 'Warning'"
             */
            Filter?: string,
            LanguageId?: WinCC.Language,
          },
        },
        OnSuccess: {
          Message: "NotifySubscribeAlarm",
          ClientCookie: Cookie,
          Params: {
            Alarms: HMIAlarm[]
          }
        },
        OnError: HMIError<"ErrorSubscribeAlarm">
      }


      /**
       * The "UnsubscribeAlarm" command unsubscribes the alarms from monitoring 
       * that was started with the cookie transferred in the call of "SubscribeAlarm".
       */
      export interface UnsubscribeAlarm extends Action {
        Request: {
          Message: "UnsubscribeAlarm",
          ClientCookie: Cookie,
        },
        OnSuccess: {
          Message: "NotifyUnsubscribeAlarm",
          ClientCookie: Cookie,
        },
        OnError: HMIError<"ErrorUnsubscribeAlarm">
      }

      /**
       * The "ReadAlarm" command reads all active alarms.
       */
      export interface ReadAlarm extends Action {
        Request: {
          Message: "ReadAlarm"
          ClientCookie: Cookie
          Params: {
            /**
             * When the list is empty or missing, all known systems are subscribed for monitoring.
             */
            SystemNames?: SystemNames[]
            /**
             * @example "AlarmClassName != 'Warning'"
             */
            Filter?: string
            LanguageId?: WinCC.Language
          }
        },
        OnSuccess: {
          Message: "NotifyReadAlarm"
          ClientCookie: Cookie
          Params: {
            Alarms: HMIAlarm[]
          }
        },
        OnError: HMIError<"ErrorReadAlarm">
      }

      export type All =
        | SubscribeTag
        | UnsubscribeTag
        | ReadTag
        | WriteTag
        | SubscribeAlarm
        | UnsubscribeAlarm
        | ReadAlarm
    }

    export type Request = Actions.All['Request']
    export type ErrorResponse = Actions.All['OnError']
    export type SuccessResponse = Actions.All['OnSuccess']
    export type Response = SuccessResponse | ErrorResponse

    export type CommandMsg = Request['Message']
    export type ErrorMsg = ErrorResponse['Message']
    export type SuccessMsg = SuccessResponse['Message']
    export type ResponseMsg = SuccessMsg | ErrorMsg
  }
}