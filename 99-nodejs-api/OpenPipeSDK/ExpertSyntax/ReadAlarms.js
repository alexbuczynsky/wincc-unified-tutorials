'use strict';
const readline = require('readline');

console.log('Start client');

var net = require('net');

const PIPE_PATH = "\\\\.\\pipe\\HmiRuntime";

let client = net.connect(PIPE_PATH, function() {
    var ReadCommand = `{"Message":"ReadAlarm","Params":{"SystemNames":["RUNTIME_1"],"Filter":"","LanguageId":1033},"ClientCookie":"CookieForReadAlarmRequest478"}\n`;

    client.write(ReadCommand);

    const rl = readline.createInterface({
        input: client,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        let obj = JSON.parse(line);
        if (obj.Message == 'NotifyReadAlarm') {
            printOnSuccess(obj.Params.Alarms);
        }
        if (obj.Message == 'ErrorReadAlarm') {
            printError(obj)
        }
    });
});

function printOnSuccess(data) {
    for (var i = 0; i < data.length; i++) {
        let acknowledgmentTime = data[i].AcknowledgmentTime;
        let alarmClassName = data[i].AlarmClassName;
        let alarmClassSymbol = data[i].AlarmClassSymbol
        let alarmText1 = data[i].AlarmText1;
        let alarmText2 = data[i].AlarmText2;
        let alarmText3 = data[i].AlarmText3;
        let alarmText4 = data[i].AlarmText4;
        let alarmText5 = data[i].AlarmText5;
        let alarmText6 = data[i].AlarmText6;
        let alarmText7 = data[i].AlarmText7;
        let alarmText8 = data[i].AlarmText8;
        let alarmText9 = data[i].AlarmText9;
        let area = data[i].Area;
        let backColor = data[i].BackColor
        let changeReason = data[i].ChangeReason;
        let clearTime = data[i].ClearTime;
        let connection = data[i].Connection;
        let deadBand = data[i].DeadBand;
        let eventText = data[i].EventText;
        let flashing = data[i].Flashing;
        let hostName = data[i].HostName;
        let iD = data[i].ID;
        let infoText = data[i].InfoText;
        let instanceID = data[i].InstanceID;
        let loopInAlarm = data[i].LoopInAlarm;
        let modificationTime = data[i].ModificationTime;
        let alarmName = data[i].Name
        let notificationReason = data[i].NotificationReason;
        let origin = data[i].Origin;
        let priority = data[i].Priority;
        let raiseTime = data[i].RaiseTime;
        let resetTime = data[i].ResetTime;
        let sourceID = data[i].SourceID;
        let sourceType = data[i].SourceType;
        let state = data[i].State;
        let stateMachine = data[i].StateMachine;
        let stateText = data[i].StateText;
        let suppressionState = data[i].SuppressionState;
        let systemSeverity = data[i].SystemSeverity;
        let tag = data[i].Tag;
        let textColor = data[i].TextColor;
        let userName = data[i].UserName;
        let value = data[i].Value;
        let valueLimit = data[i].ValueLimit;
        let valueQuality = data[i].ValueQuality;
        let groupID = data[i].AlarmGroupID;
        console.log("\nalarmName: " + alarmName + "\nalarmClassName: " + alarmClassName + "\nalarmClassSymbol:" + alarmClassSymbol + "\nalarmText1:" + alarmText1 +
            "\nalarmText2:" + alarmText2 + "\nalarmText3:" + alarmText3 + "\nalarmText4:" + alarmText4 + "\nalarmText5:" + alarmText5 + "\nalarmText6:" + alarmText6 + "\nalarmText7:" + alarmText7 +
            "\nalarmText7:" + alarmText7 + "\nalarmText8:" + alarmText8 + "\nalarmText9:" + alarmText9 + "\n area:" + area + "\n backColor" + backColor + "\nchangeReason:" + changeReason +
            "\nclearTime" + clearTime + "\nconnection:" + connection + "\ndeadBand:" + deadBand + "\neventText:" + eventText + "\nflashing:" + flashing + "\nhostName:" + hostName +
            "\niD:" + iD + "\ninfoText:" + infoText + "\ninstanceID:" + instanceID + "\nloopInAlarm:" + loopInAlarm + "\nmodificationTime" + modificationTime + "\nalarmName:" + alarmName +
            "\nnotificationReason:" + notificationReason + "\norigin:" + origin + "\npriority:" + priority + "\nraiseTime:" + raiseTime + "\nresetTime:" + resetTime + "\nsourceID:" + sourceID +
            "\nsourceType:" + sourceType + "\nstate" + state + "\nstateMachine:" + stateMachine + "\nstateText:" + stateText + "\nsuppressionState:" + suppressionState + "\nsystemSeverity:" + systemSeverity +
            "\ntag:" + tag + "\ntextColor:" + textColor + "\nuserName:" + userName + "\nvalue:" + value + "\nvalueLimit:" + valueLimit + "\nvalueQuality:" + valueQuality + "\nAlarmGroupID:"+ groupID
        );
    }
}

function printError(data) {
    let message = data.Message;
    let errorCode = data.ErrorCode;
    let errorDescription = data.ErrorDescription;
    let clientCookie = data.ClientCookie;
    console.log("\nMessage" + message + "\n Error: " + errorCode + "\n Description: " + errorDescription + "\nclientCookie: " + clientCookie);
}