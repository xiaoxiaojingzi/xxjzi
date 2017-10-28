/**
 * Created by lenovo on 2017/9/21.
 */
//创建itcast对象 封装点击事件 移动端没有点击事件 用start和end事件模拟
var itcase={
    "tap": function (dom,collback) {
        var startTime,startX,startY;
        dom.addEventListener("touchstart", function (e) {
            //判断是否是单击事件
            // 1 手指数
            if(e.targetTouches.length>1){
                return;
            }
            startTime = Date.now();
             startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });
        dom.addEventListener("touchend", function (e) {
            if(e.targetTouches.length>1){
                return;
            }
            //2 事件差超过300ms不是单击事件
            if(Date.now()-startTime>300){
                return;
            }
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(endX-startX<6&&endY-startY<6){
                collback&&collback(e);
            }
        });
    }
}