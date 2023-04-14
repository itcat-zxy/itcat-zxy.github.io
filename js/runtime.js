// var now = new Date();
// function createtime() {
//   var grt = new Date("04/01/2023 00:00:00");
//   now.setTime(now.getTime() + 250);
//   var days = (now - grt) / 1e3 / 60 / 60 / 24,
//     dnum = Math.floor(days),
//     hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
//     hnum = Math.floor(hours);
//   1 == String(hnum).length && (hnum = "0" + hnum);
//   var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
//     mnum = Math.floor(minutes);
//   1 == String(mnum).length && (mnum = "0" + mnum);
//   var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
//     snum = Math.round(seconds);
//   1 == String(snum).length && (snum = "0" + snum);
//   let currentTimeHtml = "";
//   (currentTimeHtml =
//     hnum < 18 && hnum >= 9
//       ? `<img class='boardsign' src='https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/作者-上班摸鱼中.svg' title='距离月入25k也就还差一个大佬带我~'><span class='textTip'> <br> 本站慢慢运行了 ${dnum} 天</span><span id='runtime'> ${hnum} 小时 ${mnum} 分 ${snum} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`
//       : `<img class='boardsign' src='https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/作者-下班啦.svg' title='下班了就该开开心心的玩耍，嘿嘿~'><span class='textTip'> <br> 本站挣扎着运行了 ${dnum} 天</span><span id='runtime'> ${hnum} 小时 ${mnum} 分 ${snum} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`),
//     document.getElementById("workboard") && (document.getElementById("workboard").innerHTML = currentTimeHtml);
// }
// setInterval(() => {
//   createtime();
// }, 250);


setInterval(() => {
  let create_time = Math.round(new Date('2023-04-1 00:00:00').getTime() / 1000); //在此行修改建站时间
  let timestamp = Math.round((new Date().getTime()) / 1000);
  let second = timestamp - create_time;
  let time = new Array(0, 0, 0, 0, 0);

  var nol = function(h){
    return h>9?h:'0'+h;
  }
  if (second >= 365 * 24 * 3600) {
    time[0] = parseInt(second / (365 * 24 * 3600));
    second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
    time[1] = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
  }
  if (second >= 3600) {
    time[2] = nol(parseInt(second / 3600));
    second %= 3600;
  }
  if (second >= 60) {
    time[3] = nol(parseInt(second / 60));
    second %= 60;
  }
  if (second > 0) {
    time[4] = nol(second);
  }
  if ((Number(time[2])<22) && (Number(time[2])>7)){
    currentTimeHtml ="<img class='boardsign' src='https://img.shields.io/badge/糖果屋-营业中-6adea8?style=social&logo=cakephp' title='距离百年老店也就差不到一百年~'><div id='runtime'>" + time[0] + ' YEAR ' + time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4] + '</div>';
  }
  else{
    currentTimeHtml ="<img class='boardsign' src='https://img.shields.io/badge/糖果屋-打烊了-6adea8?style=social&logo=coffeescript' title='这个点了应该去睡觉啦，熬夜对身体不好哦'><div id='runtime'>" + time[0] + ' YEAR ' + time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4] + '</div>';
  }
  document.getElementById("workboard").innerHTML = currentTimeHtml;
}, 1000);