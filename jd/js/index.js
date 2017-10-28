/**
 * Created by lenovo on 2017/9/16.
 */
//搜索框
window.onload = function () {
     search();
    sk_time();
    moveBanner();
  //  searchEffect();
};
function search(){
    var jd_search = document.querySelector(".jd_search");
    var jd_banner = document.querySelector(".jd_banner");
    window.onscroll = function () {
        var bannerHeight = jd_banner.offsetHeight;
        var scrollTop = document.body.scrollTop;
        if(scrollTop<bannerHeight){
            jd_search.style.background = "rgba(233,35,34,"+(scrollTop/bannerHeight)+")";
        }
    };
}
/*
function searchEffect(){
    var banner = document.querySelector(".jd_banner");//得到dom元素
    var bannerHeight= banner.offsetHeight;//获取这个dom元素的高度
    var search= document.querySelector(".jd_search");//获取搜索块dom元素
    window.onscroll=function(){//监听什么事件
        var offsetTop= document.body.scrollTop;//banner滚动出屏幕的距离
        var opacity=0;
        /!*判断，如果当banner还没有完全 滚出屏幕，那么才有必要计算透明度和设置透明度*!/
        if(offsetTop<bannerHeight){
            opacity= offsetTop/bannerHeight;//如何计算opacity?
            /!*设置样式*!/
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}*/
function sk_time(){
    var jd_sk_time = document.querySelector(".jd_sk_time");
    var spans = jd_sk_time.children;
    var total = 3700;
    var timer = setInterval(function () {
        total--;
        if(total<0){
            clearInterval(timer);
            return;
        }
        var hour = Math.floor(total/3600);
        //console.log(hour);
        var minute = Math.floor(total%3600/60);
        //console.log(minute);
        var seconed = Math.floor(total%60);
        //console.log(seconed);
        spans[0].innerHTML =Math.floor(hour/10);
        spans[1].innerHTML =Math.floor(hour%10);
        spans[3].innerHTML =Math.floor(minute/10);
        spans[4].innerHTML =Math.floor(minute%10);
        spans[6].innerHTML =Math.floor(seconed/10);
        spans[7].innerHTML =Math.floor(seconed%10);
    },1000)

}
function moveBanner(){
    var jd_banner = document.querySelector(".jd_banner");
    var jd_bannerImg = document.querySelector(".jd_bannerImg");
    //
    //console.log(lis);
    var firstImg =jd_bannerImg.querySelector("li:first-of-type") ;
    var lastImg = jd_bannerImg.querySelector("li:last-of-type") ;
    jd_bannerImg.appendChild(firstImg.cloneNode(true));
    jd_bannerImg.insertBefore(lastImg.cloneNode(true),jd_bannerImg.childNodes[0]);
    var lis = document.querySelectorAll(".jd_bannerImg>li");
    var count = lis.length;
    //console.log(count);
    var jd_bannerWidth = jd_banner.offsetWidth;
    jd_bannerImg.style.width = count*jd_bannerWidth+"px";
    for(var i=0;i<lis.length;i++){
        lis[i].style.width = jd_bannerWidth+"px";
    }
    jd_bannerImg.style.left = -jd_bannerWidth+"px";
    //当窗口大小改变时 重新获取宽度覆盖之前的
    var index=1;
    window.onresize = function () {
        jd_bannerWidth = jd_banner.offsetWidth;
        jd_bannerImg.style.width = count*jd_bannerWidth+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width = jd_bannerWidth+"px";
        }
        jd_bannerImg.style.left = -index*jd_bannerWidth+"px";
    };
    //切换点的样式 当每张图片过度结束后改变点标记样式
   function bannerIndicator(index){
       var bannerIndicator =jd_banner.querySelector(".jd_bannerIndicator").querySelectorAll("li");
       //console.log(jd_bannerIndicator);
       for(var i=0;i<bannerIndicator.length;i++){
           bannerIndicator[i].classList.remove("active");
       }
       bannerIndicator[index].classList.add("active");
   }
    //自动轮播
    var timer;
    var startTime = function () {
        timer = setInterval(function () {
            index++;
            //添加过渡效果
            jd_bannerImg.style.transition="left 0.5s ease-in-out";
            if(index==count-1){
                setTimeout(function () {
                    index=1;
                    jd_bannerImg.style.transition = "none";//清除过度
                    jd_bannerImg.style.left=-jd_bannerWidth+"px";//恢复到初始位置
                },500);
            }
            jd_bannerImg.style.left = -index*jd_bannerWidth+"px";
        },2000)
    };
    startTime();
    //手动轮播
    var startX,moveX,distanceX;
    var isEnd = true;//一开始没有过度
    document.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })
    document.addEventListener("touchmove", function (e) {
        if(isEnd){//当没有过渡效果时可以执行拖拽
            moveX = e.touches[0].clientX;
            distanceX = moveX-startX;
            jd_bannerImg.style.transition = "none";
            jd_bannerImg.style.left=(-index*jd_bannerWidth + distanceX)+"px";
        }
    })
    document.addEventListener("touchend", function (e) {
        //当松开拖拽时 将不能继续拖拽
        isEnd = false;
        if(Math.abs(distanceX)>100){//翻页
            if(distanceX>0){//上一张
                index--;
            }
            if(distanceX<0){
                index++;
            }
            jd_bannerImg.style.transition = "left 0.5s ease-in-out";
            jd_bannerImg.style.left = -index*jd_bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //得保证用户确实进行过滑动操作
            /*回弹*/
            jd_bannerImg.style.transition="left 0.5s ease-in-out";
            jd_bannerImg.style.left=-index*jd_bannerWidth+"px";
        }
        /*将上一次move所产生的数据重置为0*/
        startX=0;
        moveX=0;
        distanceX=0;
    })
    document.addEventListener("webkitTransitionEnd", function () {
        //当过度执行完毕后判断是否是最后一张
        if(index==count-1){
            index=1;
            jd_bannerImg.style.transition = "none";
            jd_bannerImg.style.left = -index*jd_bannerWidth+"px";
        }
       if(index==0){
            index = count-2;
            jd_bannerImg.style.transition = "none";
            jd_bannerImg.style.left = -index*jd_bannerWidth+"px";
        }
        //过度结束 改变点样式
        bannerIndicator(index-1);
        //当跳转结束后 重置isEnd
        setTimeout(function(){
            isEnd=true;
            /*清除之前添加的定时器*/
            clearInterval(timer);
            //重新开启定时器
            startTime();},100);
    })
}