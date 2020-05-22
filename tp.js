const fs = require('fs');
const https = require('https')
const request = require('request')

const options = {
    host : 'tinypng.com',
    path : '/web/shrink',
    port: '443',
    method : 'POST',
    data : '',
    headers: {
        origin: 'https://tinypng.com',
        referer: 'https://tinypng.com/',
        'content-type': 'image/jpeg',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
    }
}

fs.readdir('./pic',function(err,files){
    for (let i = 0; i < files.length; i ++) {
        let image = fs.readFileSync('./pic/' + files[i]);
        let json;
        let req = https.request(options, (res) => {
            res.on('data', (data) => {
                json = eval(`(${data})`);
                request(json.output.url).pipe(fs.createWriteStream(`./tp/${files[i]}`))
            });
            res.on('end', () => {
              console.log(`${files[i]} 已压缩, 压缩率为： ${Number(json.output.size/json.input.size*100).toFixed(1)}%`);
            });
          });
          
          req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
          });
          
          req.write(image);
          req.end();
    }
})

