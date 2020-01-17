'use strict';

const { WinCCUnifiedAPI } = require('./api');

const api = new WinCCUnifiedAPI();

class HMIDataType {

    constructor(tagName, dataType){
        this.tagName = tagName;
        this.dataType = dataType;
        this.value = null;
    }

    async Read() {
        const data = await api.ReadTagValue(this.tagName)

        switch(this.dataType){
            case 'Bool':
                this.value = Boolean(data.value)
                break;
            case 'Int':
                this.value = parseInt(data.value, 10)
                break;
            default:
                this.value = data.value;
                break;
        }
    }

    async Write(value) {

        switch(this.dataType){
            case 'Bool':
                value = Boolean(value) ? 'TRUE' : 'FALSE';
                break;
        }

        const data = await api.WriteTagValue(this.tagName, value)

        console.log({dataWritten: data})
        return data;


    }
}

class Status {
    constructor(index = 0) {
        this.tags = new Map([
            ['positionNA', new HMIDataType(`breakerStatus_breakerWL[${index}].positionNA`, 'Bool')],
            ['positionDisconnect', new HMIDataType(`breakerStatus_breakerWL[${index}].positionDisconnect`, 'Bool')],
            ['positionTest', new HMIDataType(`breakerStatus_breakerWL[${index}].positionTest`, 'Bool')],
            ['positionConnect', new HMIDataType(`breakerStatus_breakerWL[${index}].positionConnect`, 'Bool')],
            ['statusOpen', new HMIDataType(`breakerStatus_breakerWL[${index}].statusOpen`, 'Bool')],
            ['statusClosed', new HMIDataType(`breakerStatus_breakerWL[${index}].statusClosed`, 'Bool')],
            ['statusBAX', new HMIDataType(`breakerStatus_breakerWL[${index}].statusBAX`, 'Bool')],
            ['statusRTC', new HMIDataType(`breakerStatus_breakerWL[${index}].statusRTC`, 'Bool')],
            ['alarmUVR', new HMIDataType(`breakerStatus_breakerWL[${index}].alarmUVR`, 'Bool')],
            ['statusSpringCharged', new HMIDataType(`breakerStatus_breakerWL[${index}].statusSpringCharged`, 'Bool')],
            ['alarmWriteEnable', new HMIDataType(`breakerStatus_breakerWL[${index}].alarmWriteEnable`, 'Bool')],
            ['alarmDoorOpen', new HMIDataType(`breakerStatus_breakerWL[${index}].alarmDoorOpen`, 'Bool')],
            ['baxLongTime', new HMIDataType(`breakerStatus_breakerWL[${index}].baxLongTime`, 'Bool')],
            ['baxShorttime', new HMIDataType(`breakerStatus_breakerWL[${index}].baxShorttime`, 'Bool')],
            ['baxInstant', new HMIDataType(`breakerStatus_breakerWL[${index}].baxInstant`, 'Bool')],
            ['baxNeutral', new HMIDataType(`breakerStatus_breakerWL[${index}].baxNeutral`, 'Bool')],
            ['baxGround', new HMIDataType(`breakerStatus_breakerWL[${index}].baxGround`, 'Bool')],
            ['baxExtendedFunction', new HMIDataType(`breakerStatus_breakerWL[${index}].baxExtendedFunction`, 'Bool')],
            ['baxNoCurrentTrip', new HMIDataType(`breakerStatus_breakerWL[${index}].baxNoCurrentTrip`, 'Bool')],
            ['overloadPresent', new HMIDataType(`breakerStatus_breakerWL[${index}].overloadPresent`, 'Bool')],
            ['thresholdExceeded', new HMIDataType(`breakerStatus_breakerWL[${index}].thresholdExceeded`, 'Bool')],
            ['alarmPresent', new HMIDataType(`breakerStatus_breakerWL[${index}].alarmPresent`, 'Bool')],
            ['loadSheddingAlarm', new HMIDataType(`breakerStatus_breakerWL[${index}].loadSheddingAlarm`, 'Bool')],
            ['dasStatus', new HMIDataType(`breakerStatus_breakerWL[${index}].dasStatus`, 'Int')],
            ['bayBlocked', new HMIDataType(`breakerStatus_breakerWL[${index}].bayBlocked`, 'Bool')],
            ['comFailure', new HMIDataType(`breakerStatus_breakerWL[${index}].comFailure`, 'Bool')],
            ['bax', new HMIDataType(`breakerStatus_breakerWL[${index}].bax`, 'Bool')],
            ['breakerAlarmPresent', new HMIDataType(`breakerStatus_breakerWL[${index}].breakerAlarmPresent`, 'Bool')],
        ])
    }

    async ReadAll(){
        for(const [tagName, hmiTag] of this.tags) {
            try{
                await hmiTag.Read();
            }catch(err){
                console.error(err);
            }
        }
    }
}

api.on('connect', async () => {
    const status = new Status(0);
    
    await status.ReadAll();

    console.log(status.tags.get('dasStatus').value)
})