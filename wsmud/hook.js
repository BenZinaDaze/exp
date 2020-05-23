var xx = {
    'west': ['push 5', '胃昴毕觜'],
    'east': ['push 0', '氏房心'],
    'north': ['push 7', '女虚危壁'],
    'south': ['push 3', '柳星张翼'],
    'northwest': ['push 6', '奎娄斗牛'],
    'northeast': ['push 1', '角亢室'],
    'southwest': ['push 4', '井鬼参'],
    'southeast': ['push 2', '尾箕轸']
  }
  var cd = new Map(),
  gcd = false,
  skill = false,
  vs = false,
  task = false,
  lookname = '',
  wdt = false,
  qie = false,
  lookvs = false,
  mpz = false,
  sm = false,
  myid = false,
  show = false,
  yb = false,
  pfm = false,
  autopfm = false,
  dou = false,
  family = false,
  xian = false,
  ybnpc = false,
  guan = false,
  ybid = false,
  blade = 0,
  zl = '',
  cmdlist = [],
  past = 0,
  buff = {},
  buy = {
    id: false,
    npc: false,
    item: false
  },
  vsinfo = {
    begin: false,
    bj: 0,
    bjcs: 0,
    sh: 0,
    zcs: 0,
  },
  tasknpc = {
    jiao: false,
    mai: false
  },
  way = {
    wd: 'jh fam 1 start,go west,go northup,go north,go west,go northup,go northup,go northup,go north,go north,go north,go north,go north,go north',
    sl: 'jh fam 2 start,go north,go north,go northwest,go northeast,go north,go north',
    hs: 'jh fam 3 start,go westup,go north,go north',
    em: 'jh fam 4 start,go west,go south,go west,go south,go south',
    xy: 'jh fam 5 start,go down,go down',
    gb: 'jh fam 6 start,go down,go east,go east,go east,go east,go east,go up',
    zb: 'jh fam 0 start,go west,go west,go north,go enter,go west,xiulian',
    zhan: 'enable force j1sa1a740e9,enable dodge lingxibu,enable unarmed liumaishenjian,enable sword xuantiejianfa,eq 5oj14e192ac,eq u3ps333f6fc,eq ler04e192a7,eq b7vz2cfbe93,eq l3j72bc995f,eq frf1498cb22,eq rf462e55984,eq mphr38f89b5',
    lian: 'enable dodge lingxibu,enable sword quanzhenjianfa,enable force shenzhaojing,enable unarmed anranxiaohun,eq qq041a77836,eq xdfe255a136,eq 98f528c3cf8,eq ct1w3b1e226,eq lknk3719a1b,eq 0r3u5e7e336,eq 2pmh3b492e5,eq lhu1581846f'
  },
  taskinfo = {
    '武当派': ['武当派第三代弟子 谷虚道长', 'jh fam 1 start,go north'],
    '少林派': ['少林寺第四十代弟子 清乐比丘', 'jh fam 2 start'],
    '华山派': ['市井豪杰 高根明', 'jh fam 3 start'],
    '峨眉派': ['峨眉派第五代弟子 苏梦清', 'jh fam 4 start,go west'],
    '逍遥派': ['聪辩老人 苏星河', 'jh fam 5 start'],
    '丐帮': ['丐帮七袋弟子 左全', 'jh fam 6 start,go down'],
    '杀手楼': ['杀手教习 何小二', 'jh fam 7 start,go north'],
  },
  taskitem = {
    '店小二': {
      way: 'jh fam 0 start,go north,go north,go east',
      sale: ['<wht>米饭</wht>', '<wht>包子</wht>', '<wht>鸡腿</wht>', '<wht>面条</wht>', '<wht>扬州炒饭</wht>', '<wht>米酒</wht>', '<wht>花雕酒</wht>', '<wht>女儿红</wht>', '<hig>醉仙酿</hig>', '<hiy>神仙醉</hiy>'],
    },
    '杂货铺老板 杨永福': {
      way: 'jh fam 0 start,go east,go south',
      sale: ['<wht>布衣</wht>', '<wht>钢刀</wht>', '<wht>木棍</wht>', '<wht>英雄巾</wht>', '<wht>布鞋</wht>', '<wht>铁戒指</wht>', '<wht>簪子</wht>', '<wht>长鞭</wht>', '<wht>钓鱼竿</wht>', '<wht>鱼饵</wht>'],
    },
    '药铺老板 平一指': {
      way: 'jh fam 0 start,go east,go east,go north',
      sale: ['<hig>金创药</hig>', '<hig>引气丹</hig>', '<hig>养精丹</hig>'],
    },
    '铁匠铺老板 铁匠': {
      way: 'jh fam 0 start,go east,go east,go south',
      sale: ['<wht>铁剑</wht>', '<wht>钢刀</wht>', '<wht>铁棍</wht>', '<wht>铁杖</wht>', '<wht>铁镐</wht>', '<wht>飞镖</wht>'],
    },
  },
  //cmd = 'force.xin,force.ling,sword.zhong,sword.chao,unarmed.qi,unarmed.liu,unarmed.ref,parry.chang,parry.hou,throwing.luo,throwing.ding'.split(',')
  cmd = 'blade.xue,blade.ref,unarmed.qi,unarmed.liu,throwing.luo'.split(','),
  ban = ['parry.yi', 'parry.dao', 'force.cui', 'blade.shi', 'force.zhui', 'parry.dou'];
  function hook(msg) {
    var a = msg[0] == '{' || msg[0] == '[' ? eval(`(${msg})`): {type:'text',msg}
    if (a.type == 'itemadd') {
      a.name && mpz && !a.p && a.name.match(/洪七公|灭绝|岳不群|张三丰|玄难|逍遥子|独孤败天|弟子/g) != null && sock.send('kill ' + a.id);
      a.name && sm && (a.name.includes('蒙') || a.name.includes('夫长')) && sock.send('kill ' + a.id);
      if (a.name && a.name.includes(ybnpc)) {
        sock.send(`task yunbiao ${a.id} give`);
        ybnpc = false;
      }
    }
    if (a.type == 'room') {
      if (dou && a.path == 'wuyue/qingcheng/gulongqiao') go('yywd ok,enable force none,enable force jiuyinshengong,pa tu')
    }
    if (a.type == 'dispfm') {
      if (a.id && a.distime) {
        cd.set(a.id, true);
        setTimeout(function() {
          cd.set(a.id, false);
          if (yb && a.id == 'blade.xue') {
            if (get('逆转九阴')) sock.send('go east')
            else waitonecd('force.cui', 'go east')
          }
        },
        a.distime);
      }
      if (a.rtime) {
        gcd = true;
        setTimeout(function() {
          gcd = false;
        },
        a.rtime);
      } else {
        gcd = false;
      }
    }
    if (a.type == 'combat') {
      if (a.start) {
        vs = true;
        dou && go('perform force.xin')
    //    dou && wait('perform force.xin', 6e3)
        vsinfo.begin = new Date().getTime();
        sm && go('perform sword.chao,perform unarmed.liu');
      }
      if (a.end) {
        vs = false;
        let vstime = (new Date().getTime() - vsinfo.begin) / 1e3;
        $('div.content-message>pre').append(`<hir>战斗历时：${vstime.toFixed(2)}秒<br/>攻击次数：${vsinfo.zcs}次<br/>暴击次数：${vsinfo.bjcs}次<br/>暴击伤害：${vsinfo.bj}点<br/>普通伤害：${vsinfo.sh}点<br/>总伤害：${vsinfo.sh + vsinfo.bj}点<\hir>\n`);
        $('div.content-message').scrollTop(9e4)
        sm && wait('dazuo', 1e3);
        vsinfo.sh = 0;
        vsinfo.bj = 0;
        vsinfo.bjcs = 0;
        vsinfo.zcs = 0;
      }
    }
    if (a.type == 'status') {
      if (a.action == 'add' && a.id == myid) buff[a.sid] = a.name;
      if (a.action == 'remove' && a.id == myid) delete buff[a.sid];
      //if (dou && a.action == 'remove' && a.id != myid && a.sid == 'dodge') go('perform force.ling,perform sword.zhong,perform sword.chao,perform unarmed.qi,perform unarmed.liu,perform throwing.ding,perform throwing.luo')
    }
    if (a.type == 'item' && a.desc) {
      if (dou) {
        if (a.desc.match(/对应，(.*)这些星宿/) != null) {
          let nn = msg.match(/对应，(.*)这些星宿/)[1].split('，')
          let arr = ``
          for (let i of nn) {
            for (let j in xx) {
              if (xx[j][1].includes(i)) arr += `${xx[j][0]},`
            }
          }
          go(arr)
        }
        if (a.desc.match(/却仅剩一颗(.*)宿星孤零零的闪烁着/) != null) {
          let nn = msg.match(/却仅剩一颗(.*)宿星孤零零的闪烁着/)[1]
          for (let j in xx) {
            if (xx[j][1].includes(nn)) {
              zl = `go ${j}`
              break
            }
          }
        }
      }
    }
    if (a.type == 'text') {
      if (dou && a.msg.includes('看起来狼王想杀死你')) sock.send('perform sword.wu')
      if (dou && a.msg.includes('青青往')) {
        let qqw = a.msg.match(/青青往(.*?)方走去/)[1]
        var wayqq = {
          '北': 'go north',
          '南': 'go south',
          '东': 'go east',
          '西': 'go west'
        }
        sock.send(wayqq[qqw])
      }
      if (dou && a.msg.includes('只要伸手')) sock.send('answer s2')
      if (dou && a.msg.includes('不要管那么多')) sock.send('answer s4')
      if (dou && a.msg.includes('你是人是鬼')) sock.send('answer s5')
      if (dou && a.msg.includes('不要阻止我')) sock.send('answer s7')
      if (dou && a.msg.includes('只是觉得有些诡异')) sock.send('answer s9')
      if (dou && a.msg.includes('你带我去看看')) sock.send('answer s10')
      if (dou && a.msg.includes('跟在青青后面走了进来')) go('go west,go north')
      if (dou && a.msg.includes('瞬时间就消失在远')) go('answer s1,cai cao')
      if (dou && a.msg.includes('他的剑已出鞘闪电刺向青青')) sock.send('answer s3')
      if (dou && a.msg.includes('靠在墙角奋力发出')) sock.send('go down')
      if (a.msg.includes('对著你') || a.msg.includes('杀死你') || a.msg.includes('你对著') || a.msg.includes('打赢我')) {
        if (!qie) return
        !get('嗜血') && sock.send('perform blade.shi');
        !get('逆转九阴') && sock.send('perform force.cui');
        !get('移花') && sock.send('perform parry.yi');
        !get('混沌') && sock.send('perform force.busi');
        //sock.send('kill krxn4bf661a')
        for (let i of cmd) sock.send('perform ' + i);
      }
      if (a.msg.match(/\((.*)\)/) != null && a.msg.match(/造成(.*)点(.*)害/) != null) {
        let who = a.msg.match(/\((.*)\)/)[1];
        if (!who.includes('你')) {
          let sc = a.msg.match(/造成(.*)点(.*)害/)[1];
          let sh = parseInt(sc.match(/>(.*?)<\//)[1]);
          vsinfo.zcs++;
          if (sc.includes('hir')) vsinfo.bj += sh,vsinfo.bjcs++;
          else vsinfo.sh += sh;
        }
      }
      if (a.msg.includes('只能在战斗中使用')) vs = false;
      sm && a.msg.includes('你的内力恢复了') && sock.send('stopstate');
      if (dou && a.msg.includes('蕴含着降龙十八掌的十八般变化')) sock.send('perform parry.dou');
      if (a.msg.includes('你顿时觉得眼前一花，手腕一麻')) sock.send('eq f5kq3be1535');
      if (task) {
        if (a.msg.includes('帮我找')) {
          let item = a.msg.match(/<(.*)>(.*)<\/(.*)>/)[0];
          for (let i in taskitem) {
            if (taskitem[i].sale.includes(item)) {
              buy.npc = i;
              buy.item = item;
              return;
              click(taskitem[i].way);
            }
          }
          buy.item = item;
          click(`task sm ${tasknpc.jiao}`);
        }
        a.msg.match(/师父让别人去找|你的师门任务完成了/g) != null && click(`task sm ${tasknpc.jiao}`);
        a.msg.includes('你先去休息一下吧') && change('task');
      }
      if (wdt && (a.msg.includes('恭喜你战胜了武道塔守护者') || a.msg.includes('无法移动'))) wait('go up', 300);
      if (yb && a.msg.includes('这里有一批镖银需要交给')) {
        ybnpc = a.msg.match(/这里有一批镖银需要交给(.*)，你现在就出发吧。/)[1];
        wait('go east', 500)
      }
      if (yb && a.msg.includes('这是你的报酬')) go('jh fam 0 start,go west,go west,go south,go south');
      if (yb && a.msg.includes('你先等等，客户好像不见了')) go(`task yunbiao ${ybid} start ok`)
      if (yb && a.msg.includes('最近暂时没有委托，你先休息下吧。')) {
        change('yb')
        change('qie')
        go(way.zb)
      }
    }
    if (a.type == 'items') {
      for (let i of a.items) {
        if (!i.name) continue;
        if (yb && !i.p && i.name == '福威镖局当家的 林震南') {
          sock.send(`task yunbiao ${i.id} start ok`)
          ybid = i.id
        }
        if (i.name == '擂台比武报名' && !i.p) guan = `askbiwu1 ${i.id}`
        if (wdt && !i.p && i.name == '守门人') go(`ask1 ${i.id},go enter`)
        mpz && !i.p && i.name.match(/洪七公|灭绝|独孤败天|岳不群|张三丰|玄难|逍遥子|弟子/g) != null && sock.send('kill ' + i.id);
        sm && i.name.match(/蒙古|夫长|蒙哥/g) != null && sock.send('kill ' + i.id);
        wdt && i.name.includes('武道塔守护者') && wait(`kill ${i.id}`, 300);
        wdt && i.name.match(/塔主|领主|统领|镇守/g) != null && change('wdt');
        if (i.name.includes(ybnpc)) {
          sock.send(`task yunbiao ${i.id} give`);
          ybnpc = false;
        }
        if (!task) continue;
        if (i.name == family[0]) {
          tasknpc.jiao = i.id;
          click(`task sm ${i.id}`);
        }
        if (i.name == buy.npc) {
          buy.id = i.id;
          click(`list ${i.id}`);
        }
      }
    }
    if (a.type == 'dialog') {
      a.dialog == 'pack' && a.name && a.name.match(/大宋|蒙古|笠子|鲲鹏|罗汉|君子|混天|曙光|真武/g) != null && a.name.match(/残页|hio|HIZ/g) == null && sock.send(`fenjie ${a.id}`, 1e3);
      if (a.dialog == 'score') {
        family = taskinfo[a.family];
        if (task) click(family[1]);
      }
      if (task && a.dialog == 'list') {
        for (let i of a.selllist) {
          if (i.name == buy.item) click(`buy 1 ${i.id} from ${buy.id},${family[1]}`);
        }
      }
    }
    if (a.type == 'cmds') {
      if (task) {
        var giveup = false;
        for (let i of a.items) {
          if (i.name.includes('放弃')) giveup = i.cmd;
          if (i.name == `上交${buy.item}`) {
            click(i.cmd);
            return;
          }
        }
        click(giveup);
      }
    }
    if (a.type == 'perform') {
      let lsskill = [];
      for (let i of a.skills) lsskill.push(i.id);
      skill = lsskill;
    }
    if (a.type == 'die' && !a.relive) {
      buff = {};
      dou && setTimeout(() => go('relive,jh fam 3 start,go westup,go north,go north'), 3e3)
      yb && waitcd('relive locale')
    }
    if (a.type == 'login') {
      $('.right-bar').prepend(`<span class="tool-item" id="script" style='opacity: 0; display: none;'><span class='glyphicon glyphicon-heart tool-icon'></span><span class='tool-text'>脚本</span></span>`);
      $("#script").on("click",
      function() {
        show = show ? false: true;
        if (show) $(".button").show();
        else $(".button").hide();
      });
      !myid && load();
      myid = a.id;
    }
  }
  
  function load() {
    sock.__proto__.oldsend = sock.__proto__.send
    sock.__proto__.send = function(c) {
      if (c[0] == '$') {
        go(way[c.replace(/\$/, '')]);         
        return;
      }
      if (c[0] == '@') {
        eval(`${c.replace(/@/, '')}()`);     
        return;
      }
      if (c[0] == '%') {
        change(c.replace(/%/, ''));
        return;
      }
      if (c == '&') {
        let order = prompt('请输入', zl);
        zl = order ? order: zl;
        if (order && order != null && order != '') go(order);
        return;
      }
      if (xian) {
        $('div.content-message>pre').append(`<hir>${c}<\hir>\n`);
        $('div.content-message').scrollTop(9e4);
      }
      if (c == 'mp') {
        $('div.content-message>pre').append(`<div class="item-commands">
                                            <span cmd='$wd'>武当</span>
                                            <span cmd='$sl'>少林</span>
                                            <span cmd='$hs'>华山</span>
                                            <span cmd='$em'>峨眉</span>
                                            <span cmd='$xy'>逍遥</span>
                                            <span cmd='$gb'>丐帮</span>
                                            </div>`);
        $('div.content-message').scrollTop(9e4);
        return;
      }   
      this.oldsend(c)
    }
    $(".content-message").after(`
    <div class='button' style='display:none;'>
    <span class='script mp' cmd='mp'>门派</span>
    <span class='script zb' cmd='$zb'>自闭</span>
    <span class='script pfm' cmd='@Pfm'>出招</span>
    <span class='script qie' cmd='%qie'>切磋</span>
    <span class='script wdt' cmd='%wdt'>武道</span>
    <span class='script task' cmd='%task'>师门</span>
    <span class='script sm' cmd='%sm'>襄阳</span><br>
    <span class='script mpz' cmd='%mpz'>掌门</span>
    <span class='script yb' cmd='%yb'>押镖</span>
    <span class='script cmd' cmd='&'>命令</span>
    <span class='script xian' cmd='%xian'>代码</span>
    <span class='script zhan' cmd='$zhan'>战斗</span>
    <span class='script lian' cmd='$lian'>练习</span>
    <span class='script dou' cmd='%dou'>斗转</span><br>
    </div>`);
  }
  
  function waitcd(a) {
    for (let i of skill) {
      if (cd.get(i)) {
        setTimeout(() => waitcd(a), 100)
        return
      }
    }
    sock.send(a)
  }
  
  function waitonecd(a, b) {
    if (cd.get(a)) {
      setTimeout(() => waitonecd(a, b), 100)
      return
    }
    sock.send(b)
  }
  
  function click(a) {
    cmdlist = cmdlist.concat(a.split(','));
    clicks();
  }
  
  function clicks() {
    var now = new Date().getTime();
    if (cmdlist.length < 1) return;
    if (now - past < Math.floor(Math.random() * 70 + 250)) {
      setTimeout(clicks, 10);
      return;
    }
    sock.send(cmdlist[0]);
    cmdlist.shift();
    past = now;
    if (cmdlist.length > 0) setTimeout(clicks, 10);
  }
  
  function go(a) {
    for(let i of a.split(',')) sock.send(i);
  }
  
  function get(a) {
    for(let i in buff) {
      if (buff[i] == a) return true;
    }
    return false;
  }
  
  function wait(a, b) {
    setTimeout(() => {
      for (let i of a.split(',')) sock.send(i);
    }, b);
  }
  
  function change(a) {
    eval(`${a} = ${a} ? false: true`);
    if (a == 'task' && eval(a)) {
      if (family) click(family[1]);
      else sock.send('score');
    }
    if (a == 'yb' && eval(a)) go('jh fam 0 start,go west,go west,go south,go south')
    if (a == 'wdt') {
      eval(a) ? go('setting auto_pfm 0,jh fam 9 start') : sock.send('setting auto_pfm blade.shi,force.cui,parry.yi,throwing.ding,unarmed.qi,unarmed.liu,throwing.luo,blade.ref,blade.xue')
    }
    $(`.${a}`).css('background', eval(a) ? '#3E0000': '');
  }
  
  function Pfm() {
    autopfm = autopfm ? false: true;
    if (autopfm) {
      pfm = setInterval(() => {
        if (!vs || gcd || get('昏迷')) return;
        if (skill.includes('parry.dao')) {
          if (get('束缚') || get('忙乱') || get('失明')) {
            if (!cd.get('parry.dao')) sock.send('perform parry.dao');
            else return;
          }
          if (get('迟钝') && !cd.get('parry.dao')) sock.send('perform parry.dao');
        } else {
          if (get('束缚') || get('忙乱') || get('失明')) return;
        }
        for(let i of skill) {
          if (!cd.get(i)) {
            if (i == 'force.xin' && !get('剑心')) {
            sock.send('perform ' + i);
            continue
            }
            if (i == 'force.ling' && !get('灵犀')) {
                sock.send('perform ' + i);
                continue
            }
            if (i == 'blade.shi' && !get('嗜血')) {
              sock.send('perform ' + i);
              continue;
            }
            if (i == 'force.cui' && !get('逆转九阴')) {
              sock.send('perform ' + i);
              continue;
            }
            if (i == 'parry.yi' && !get('移花')) {
              sock.send('perform ' + i);
              continue;
            }
            if (i == 'force.busi' && !get('混沌')) {
                sock.send('perform ' + i);
                continue;
              }
          }
        }
        for(let l of skill) {
          if (cd.get(l) || ban.includes(l)) continue;
          sock.send('perform ' + l);
          return;
        }
      },
      250);
    } else {
      clearInterval(pfm);
    }
    $('.pfm').css('background', autopfm ? '#3E0000': '');
  }
  