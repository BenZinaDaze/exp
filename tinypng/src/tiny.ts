/*
 * @Description:
 * @Author: benz1
 * @Date: 2021-12-16 15:19:31
 * @LastEditTime: 2021-12-16 16:43:28
 * @LastEditors: benz1
 * @Reference:
 */
import fs from "fs";
import https from "https";
import request from "request";

const newPath = "./new";
const oldPath = "./image";

const options = {
    host: "tinypng.com",
    path: "/web/shrink",
    port: "443",
    method: "POST",
    data: "",
    headers: {
        origin: "https://tinypng.com",
        referer: "https://tinypng.com/",
        "content-type": "image/jpeg",
        "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
    }
};

fs.readdir(oldPath, function (err: any, files: any) {
    for (let i = 0; i < files.length; i++) {
        let image = fs.readFileSync(oldPath + "/" + files[i]);
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }
        let json: any;
        let req = https.request(options, (res: any) => {
            res.on("data", (data: any) => {
                json = eval(`(${data})`);
                request(json.output.url).pipe(fs.createWriteStream(`${newPath}/${files[i]}`));
            });
            res.on("end", () => {
                console.log(
                    `${files[i]} 已压缩, 压缩率为： ${Number((json.output.size / json.input.size) * 100).toFixed(1)}%`
                );
            });
        });

        req.on("error", (e: any) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        req.write(image);
        req.end();
    }
});
