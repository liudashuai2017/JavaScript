/**
 * Created by Administrator on 2017/4/25 0025.
 */
/**
 * JS实现思路:
 *
 *
 * 1.让main的父盒子当前页面水平居中
 *
 * 设置main的width ?
 *
 * 设置main的margin + 0 auto
 *
 *
 * 2.让所有的子盒子在main的父盒子中进行定位
 *
 *
 * 3.拖动滚动条,让后面的子盒子不断的加载更多
 * */
window.onload = function () {
   waterFall('main','box') ;
   //加载图片
   window.onscroll = function () {
     if(isWillLoadBox()){
     //假数据库
         var dateArr = [
             {src:'0.jpg'},
             {src:'13.jpg'},
             {src:'15.jpg'},
             {src:'27.jpg'},
             {src:'3.jpg'},
             {src:'4.jpg'},
             {src:'22.jpg'}
         ];
         //遍历，取出图片
         for(var i=0; i<dateArr.length; i++){
             //创建BOX
             var newBox = document.createElement('div');
             newBox.className = 'box';
             $('main').appendChild(newBox);
             //创建BOX里的pic
             var newPic = document.createElement('div');
             newPic.className = 'pic';
             newBox.appendChild(newPic);
             //创建IMG
             var newImg = document.createElement('img');
             newImg.src = 'images/' + dateArr[i].src;
             newPic.appendChild(newImg);
         }
         // 重新布局
         waterFall('main','box');
     }
   }
};
function waterFall(parent,box) {
// 父盒子居中，并获取所有子盒子
    var allBox = $(parent).getElementsByClassName(box);
    //获取盒子宽度和屏幕宽度
    var boxWidth = allBox[0].offsetWidth;
    var screenW = document.documentElement.clientWidth||document.body.clientWidth;
    //计算列盒子个数
    var cols = Math.floor(screenW/boxWidth);
    //父盒子水平居中
    $(parent).style.width = cols*boxWidth + 'px';
    $(parent).style.margin = '0 auto';
//子盒子居中，定义一个数组来储存盒子高度
    var heightArr = [],boxHeight = 0, minBoxHeight=0, minBoxIndex=0;
    for(var i=0; i<allBox.length; i++){
        //计算每一个盒子高度
        boxHeight = allBox[i].offsetHeight;
        if(i<cols){
            heightArr.push(boxHeight);
        }else {
        //其他行，计算最矮盒子的高度,对应索引
            minBoxHeight = _.min(heightArr);
            minBoxIndex = getMinBoxIndex(heightArr,minBoxHeight);
            //子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
        //更新数组
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}
//计算最矮盒子的对应索引
function getMinBoxIndex(arr,val) {
    for(var i=0; i<arr.length; i++){
        if(arr[i] == val){
            return i ;
        }
    }
}
//自动添加图片
function isWillLoadBox() {
    //获取最后一个盒子
    var allBox = $('main').getElementsByClassName('box');
    var lastBox = allBox[allBox.length - 1];
    // 2. 求出最后一个盒子高度的一半 + 头部偏离的高度
    var lasBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop ;
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;
    // 4. 求出页面偏离浏览器的高度
    var scrollTop = scroll().top;
    //6.判断是否满足条件
    return lasBoxDis <= scrollTop + screenH;
}