import { HMIDataSet } from "../wincc-api/HMIDataSet";

export function BreakerStatus(id: number) {
  return HMIDataSet.Factory({
    'positionNA': {
      RefName: `breakerStatus_breakerWL[${id}].positionNA`,
      DataType: 'Bool'
    },
    'positionDisconnect': {
      RefName: `breakerStatus_breakerWL[${id}].positionDisconnect`,
      DataType: 'Bool'
    },
    'positionTest': {
      RefName: `breakerStatus_breakerWL[${id}].positionTest`,
      DataType: 'Bool'
    },
    'positionConnect': {
      RefName: `breakerStatus_breakerWL[${id}].positionConnect`,
      DataType: 'Bool'
    },
    'statusOpen': {
      RefName: `breakerStatus_breakerWL[${id}].statusOpen`,
      DataType: 'Bool'
    },
    'statusClosed': {
      RefName: `breakerStatus_breakerWL[${id}].statusClosed`,
      DataType: 'Bool'
    },
    'statusBAX': {
      RefName: `breakerStatus_breakerWL[${id}].statusBAX`,
      DataType: 'Bool'
    },
    'statusRTC': {
      RefName: `breakerStatus_breakerWL[${id}].statusRTC`,
      DataType: 'Bool'
    },
    'alarmUVR': {
      RefName: `breakerStatus_breakerWL[${id}].alarmUVR`,
      DataType: 'Bool'
    },
    'statusSpringCharged': {
      RefName: `breakerStatus_breakerWL[${id}].statusSpringCharged`,
      DataType: 'Bool'
    },
    'alarmWriteEnable': {
      RefName: `breakerStatus_breakerWL[${id}].alarmWriteEnable`,
      DataType: 'Bool'
    },
    'alarmDoorOpen': {
      RefName: `breakerStatus_breakerWL[${id}].alarmDoorOpen`,
      DataType: 'Bool'
    },
    'baxLongTime': {
      RefName: `breakerStatus_breakerWL[${id}].baxLongTime`,
      DataType: 'Bool'
    },
    'baxShorttime': {
      RefName: `breakerStatus_breakerWL[${id}].baxShorttime`,
      DataType: 'Bool'
    },
    'baxInstant': {
      RefName: `breakerStatus_breakerWL[${id}].baxInstant`,
      DataType: 'Bool'
    },
    'baxNeutral': {
      RefName: `breakerStatus_breakerWL[${id}].baxNeutral`,
      DataType: 'Bool'
    },
    'baxGround': {
      RefName: `breakerStatus_breakerWL[${id}].baxGround`,
      DataType: 'Bool'
    },
    'baxExtendedFunction': {
      RefName: `breakerStatus_breakerWL[${id}].baxExtendedFunction`,
      DataType: 'Bool'
    },
    'baxNoCurrentTrip': {
      RefName: `breakerStatus_breakerWL[${id}].baxNoCurrentTrip`,
      DataType: 'Bool'
    },
    'overloadPresent': {
      RefName: `breakerStatus_breakerWL[${id}].overloadPresent`,
      DataType: 'Bool'
    },
    'thresholdExceeded': {
      RefName: `breakerStatus_breakerWL[${id}].thresholdExceeded`,
      DataType: 'Bool'
    },
    'alarmPresent': {
      RefName: `breakerStatus_breakerWL[${id}].alarmPresent`,
      DataType: 'Bool'
    },
    'loadSheddingAlarm': {
      RefName: `breakerStatus_breakerWL[${id}].loadSheddingAlarm`,
      DataType: 'Bool'
    },
    'dasStatus': {
      RefName: `breakerStatus_breakerWL[${id}].dasStatus`,
      DataType: 'Bool'
    },
    'bayBlocked': {
      RefName: `breakerStatus_breakerWL[${id}].bayBlocked`,
      DataType: 'Bool'
    },
    'comFailure': {
      RefName: `breakerStatus_breakerWL[${id}].comFailure`,
      DataType: 'Bool'
    },
    'bax': {
      RefName: `breakerStatus_breakerWL[${id}].bax`,
      DataType: 'Bool'
    },
    'breakerAlarmPresent': {
      RefName: `breakerStatus_breakerWL[${id}].breakerAlarmPresent`,
      DataType: 'Bool'
    },
  })
}