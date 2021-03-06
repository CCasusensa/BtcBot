// lrenex made!
'use strict';
require('log-timestamp');
const fs = require('fs');
const rp = require('request-promise');
const dataPath = 'D:/xampp/htdocs/data.json';
const updateTime = 30 * 60 * 1000; // 30 分鐘更新
const apiKey = ''; // 到https://pro.coinmarketcap.com/ 申請API Key
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start': '1',
        'limit': '100',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
};

function updateData(updateMessage) {
    rp(requestOptions).then(response => {
        if (updateMessage == undefined) {
            updateMessage = true;
        }
        if (fs.existsSync(dataPath)) {
            console.log(`偵測到${dataPath}資料，已經刪除.`);
            fs.unlinkSync(dataPath);
        }
        fs.writeFileSync(dataPath, JSON.stringify(response));
        if (updateMessage)
            console.log(`${dataPath}資料已經更新!`);
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
}

function firstCheckFileExist() {
    if (!fs.existsSync(dataPath)) {
        updateData(false);
        console.log(`資料已經建立到${dataPath}!`);
    }
}

firstCheckFileExist();
console.log("虛擬貨幣查詢系統by lrenex 每30分鐘查詢一次");
setInterval(updateData, updateTime);
