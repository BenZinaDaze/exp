// ==UserScript==
// @name         wsmud_ty
// @namespace    github
// @version      1.0
// @homepage     网站链接
// @description  武神传说 MUD
// @author       benz1
// @match        http://game.wsmud.com/*
// @match        http://www.wsmud.com/*
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest


// ==/UserScript==

(function () {
    'use strict';

    var WG = undefined;
    var T = undefined;
    var messageAppend = undefined;
    var messageClear = undefined;

    var pot1 = 0; // 前
    var pot2 = 0; // 后
    var server = "SCU15878Tc5ba2045f8d53dc824545a5af32e94f65a0926afba205";
    var ty_timer = 0;
    var ty = false;

    function init(){
        $("div.WG_button").append("<span class='zdy-item ty'>推演</span>");
        $(".ty").on("click", function(){
            if($('.ty').text().indexOf("停止") >= 0){
                clearInterval(ty_timer);
                ty_timer = 0;
                pot1 = 0; // 前
                pot2 = 0; // 后
                ty = false;
                $(".ty").text("推演");
            }else{
                if (ty_timer == 0){
                    ty_timer = setInterval(function(){
                        WG.Send("score");
                    },30000);
                }
                ty = true;
                $(".ty").text("停止");
            }
        });
        WG.add_hook("dialog", function(data) {
            if (data.name && ty){
                if (data.dialog == "score") {
                    pot2 = data.pot;
                    console.log(pot2);
                    if (parseInt(pot1) == 0){
                        pot1 = data.pot;
                    }
                    if ( parseInt(pot1) - parseInt(pot2) > 1000000 ){
                        //console.log("推演出一个属性");
                        //talk();
                        WG.Send("stopstate");
                        WG.Send("zc typelv club");
                        pot1 = data.pot;
                    }
                }
            }
        });
    }

    function talk(){
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://sc.ftqq.com/" + server + ".send?text=推演出一个属性啦",
            // data: "",
            // headers: {
            //   "Content-Type": "application/x-www-form-urlencoded"
            // },
            onload: function(response) {
            //   console.log(response.responseText);
            }
          });
    }

    $(document).ready(function () {
        WG = unsafeWindow.WG;
        T = unsafeWindow.T;
        messageAppend  = unsafeWindow.messageAppend;
        messageClear =  unsafeWindow.messageClear;

        WG.add_hook("login", function(data) {
            // console.log("登录了");
            // talk();
            init();
        });

    });
})();