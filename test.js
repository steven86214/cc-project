const http = require('http');
const url = require('url');

const firebase = require('firebase/app');
require('firebase/database');

const server = http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {  // 因接收時會一併取得 undefined 的 facicon.ico，使用簡單的邏輯排除
        const params = url.parse(req.url, true).query; //取得網址每個參數
        const ref = params.ref || '/';
        const type = params.type || 'set';
        const data = params.data;
        // 發送 https://網址?databaseUrl=XXX&type=push&ref=XXX&data=XXX 就可寫入資料
        // 發送 https://網址?databaseUrl=XXX&type=read&ref=XXX 就可讀取資料

        const opt = { 
            databaseURL: `https://${params.databaseUrl}/`
        };
        const app = firebase.initializeApp(opt); // firebase 初始化
        const database = app.database();

        switch (type) {  // 依據不同的參數寫入或讀取資料
            case 'push':
                database.ref(ref).push(data).then(() => {
                    res.end(`push data to "${ref}" ok`);
                    firebase.app().delete(); // 寫入完成後刪除 firebase 宣告
                });
                break;
            case 'set':
                database.ref(ref).set(data).then(() => {
                    res.end(`set data to "${ref}" ok`);
                    firebase.app().delete(); // 寫入完成後刪除 firebase 宣告
                });
                break;
            case 'read':
                database.ref(ref).once('value', e => {
                    let dataObj = e.val();
                    let html = '';
                    for (let i in dataObj) {
                        html = `${html}<div>${dataObj[i]}</div>`;
                    }
                    console.log(e.val());
                    res.end(html);
                }).then(() => {
                    firebase.app().delete(); // 讀取完成後刪除 firebase 宣告
                });
                break;
        }
    }
});
server.listen(5000);