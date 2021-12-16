"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @Author: benz1
 * @Date: 2021-12-16 15:19:31
 * @LastEditTime: 2021-12-16 16:33:54
 * @LastEditors: benz1
 * @Reference:
 */
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const request_1 = __importDefault(require("request"));
const newPath = "./new";
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
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
    },
};
fs_1.default.readdir("./pic", function (err, files) {
    for (let i = 0; i < files.length; i++) {
        let image = fs_1.default.readFileSync("./pic/" + files[i]);
        if (!fs_1.default.existsSync(newPath)) {
            fs_1.default.mkdirSync(newPath);
        }
        let json;
        let req = https_1.default.request(options, (res) => {
            res.on("data", (data) => {
                json = eval(`(${data})`);
                (0, request_1.default)(json.output.url).pipe(fs_1.default.createWriteStream(`${newPath}/${files[i]}`));
            });
            res.on("end", () => {
                console.log(`${files[i]} 已压缩, 压缩率为： ${Number((json.output.size / json.input.size) * 100).toFixed(1)}%`);
            });
        });
        req.on("error", (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        req.write(image);
        req.end();
    }
});
