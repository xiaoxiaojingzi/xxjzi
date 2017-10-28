/**
 * Created by lenovo on 2017/9/19.
 */
    /*创建对象 添加单击属性 移动端没有单击事件 用拖动事件的start end事件模拟单击事件 */
var itcast = {
    tap: function (dom,callback) {
        var startTime,startX,startY;
        dom.addEventListener("touchstart", function (e) {
            //1，判断是否是一只手指
            if(e.targetTouches.length>1){
                return;
            }
            //2.通过时间判断 获取start的时间
            startTime = Date.now();

            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });
        dom.addEventListener("touchend", function (e) {
            var endTime = Date.now();
            //如果时间差超过300ms说明不是单击事件
            if(e.targetTouches>1){//不止一根手指
                return;
            }
            if(endTime-startTime>300){//不是单击事件
                return;
            }
            //手指松开时可能会有抖动 获取送开时的位置 与点击时位置对比 若在可接受范围 就是单击事件
            var endX=e.changedTouches[0].clientX;//此处不能用手指数判断距离 只能通过当手指消失时获取距离
            var endY=e.changedTouches[0].clientY;
            if(Math.abs(endX-startX)<6&&Math.abs(endY-startY)<6){
                callback&&callback(e);
            }

        });
    }
}