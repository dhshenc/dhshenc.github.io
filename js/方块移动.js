//获取移动方块
var area;

//获取移动区域
var fk;

//公共线程
var t = null;

//地图最大边界
var bigArea1;
var bigArea2;

//每次移动的大小
var moveArea;

//记录上下移动的位置信息
var n=0;

//记录左右移动的位置信息
var m=0;

//结束游戏
var over = true;

//食物位置
var x;
var y;
var addDiv;

//蛇身体长度
var slenght=0;
var arr1 = new Array();
var arr2 = new Array();
var a,b;

//地图左上角的位置
var mapTop;
var mapLeft;

//再次记录键值
var mkey1;

//程序开始入口
function main(){
    //显示系统时
    setInterval("showTime()",1000);

    //获取移动区域
    area = document.getElementById("area");

    //获取方块移动区域
    fk = document.getElementById("fk");



    //每次移动位置,获取的是移动元素的大小
    moveArea = fk.offsetHeight;

    //获取地图左上角的位置
    mapLeft = area.offsetLeft;
    mapTop = area.offsetTop;
    n=mapTop;
    m=mapLeft;

    //获取最大的边界
    bigArea1 = mapLeft+300;
    bigArea2 = mapTop+300;

    //记录每次按的键值
    var mkey=null;

    //让方块出生在中间位置
    n = 150+mapTop;
    m = 150+mapLeft;
    fk.style.top = n + "px";
    fk.style.left = m + "px";

    //保存方框的位置
    arr1[0]=n;
    arr2[0]=m;

    //食物随机出现位置
    food();


    //监听键盘事件
    document.onkeydown = function (setKey) {
        if(over==true) {
            if (mkey != setKey.key) {
                mkey = null;
            }
            if (setKey.key == "j"&&mkey1!="k") {//下
                mkey1=setKey.key;
                if (mkey != null) {
                    if (n < bigArea) {
                        moveDown();
                    }
                } else {
                    if (t != null) {
                        clearInterval(t);
                        t = null;
                    }
                    mkey = setKey.key;
                    t = setInterval("moveDown()", 200);
                }
            } else if (setKey.key == "k"&&mkey1!="j") {//上
                mkey1=setKey.key;
                if (mkey != null) {
                    if (n > mapTop) {
                        moveUp();
                    }
                } else {
                    if (t != null) {
                        clearInterval(t);
                        t = null;
                    }
                    mkey = setKey.key;
                    t = setInterval("moveUp()", 200);
                }
            } else if (setKey.key == "h"&&mkey1!="l") {//左
                mkey1=setKey.key;
                if (mkey != null) {
                    if (m > mapLeft) {
                        moveLeft();
                    }
                } else {
                    if (t != null) {
                        clearInterval(t);
                        t = null;
                    }
                    mkey = setKey.key;
                    t = setInterval("moveLeft()", 200);
                }
            } else if (setKey.key == "l"&&mkey1!="h") {//右
                mkey1=setKey.key;
                if (mkey != null) {
                    if (m < bigArea) {
                        moveRight();
                    }
                } else {
                    if (t != null) {
                        clearInterval(t);
                        t = null;
                    }
                    mkey = setKey.key;
                    t = setInterval("moveRight()", 200);
                }
            }
        }else if(setKey.key=="t"){//按T重新开始游戏
            reload1();
        }
    };

};
function moveUp(){//上移动
    n -= moveArea;
    fk.style.top = n + "px";
    eatFood();
    if(n<mapTop){
        fk.style.top=(n+10)+"px";
        clearInterval(t);
        over = false;
        document.getElementById("start").innerText="游戏结束,按T重新开始";
    }else{
        sbody();
    }
};
function moveDown(){//下移动
    n += moveArea;//每次移动相加
    fk.style.top = n + "px";
    eatFood();
    if(n>bigArea2-10){
        fk.style.top=(n-10)+"px";
        clearInterval(t);
        over = false;
        document.getElementById("start").innerText="游戏结束,按T重新开始";
    }else{
        sbody();
    }
};
function moveLeft(){//左移动
    m-=moveArea;
    fk.style.left= m +"px";
    eatFood();
    if(m<mapLeft){
        fk.style.left=(m+10)+"px";
        clearInterval(t);
        over = false;
        document.getElementById("start").innerText="游戏结束,按T重新开始";
    }else{
        sbody();
    }
};
function moveRight(){//右移动
    m+=moveArea;
    fk.style.left= m +"px";
    eatFood();
    if(m>bigArea1-10){
        fk.style.left=(m-10)+"px";
        clearInterval(t);
        over = false;
        document.getElementById("start").innerText="游戏结束,按T重新开始";
    }else{
        sbody();
    }
};

function sbody(){//蛇身体
    for (let i = slenght; i >=0 ; i--) {
        arr1[i+1]=arr1[i];
        arr2[i+1]=arr2[i];
        if(i==0){
            arr1[i]=n;
            arr2[i]=m;
        }
    }
    for (let j = 1; j <slenght+1 ; j++) {
        document.getElementById("food"+(j-1)).style.top=arr1[j]+"px";
        document.getElementById("food"+(j-1)).style.left=arr2[j]+"px";
    }
}

// function slocation(){
//     for (let i = 0; i <=slenght; i++) {
//         arr1[i]=n;
//         arr2[i]=m;
//     }
// }

function eatFood(){//判断什么时候吃到食物
    if(n==x&&m==y){
        slenght++;
        food();
    }
}
function food(){//随机食物
     do {
        x = (parseInt((Math.random() * 29)-1) * 10)+mapTop;
        y = (parseInt((Math.random() * 29)-1) * 10)+mapLeft;
        if (x != n || y != m) {//防止和移动方块位置冲突
            addDiv = document.createElement("div");
            area.appendChild(addDiv);
            addDiv.setAttribute("id","food"+(slenght));
            addDiv.setAttribute("style","background-color:red;" +
                "width:10px;height:10px;position:fixed;top:"+x+"px;left:"+y+"px");
            break;
        }
    }while(true);
}

function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var HH = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    document.getElementById("clock").innerHTML=year+'年'+month+'月'+day+'日'+' '+HH+':'+mm+':'+ss;
}

function reload1(){
    location.reload();
}

window.onload = main();
window.onload = showTime();

