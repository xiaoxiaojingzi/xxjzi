/**
 * Created by lenovo on 2017/9/19.
 */
window.onload = function () {
    //获取左侧内容盒子
    var left_content = document.querySelector(".left_content");
    //获取盒子的高度
    var left_contentHeight = left_content.offsetHeight;
    var ulBox = left_content.querySelector("ul:first-of-type");
    //console.log(ulBox);
    //获取盒子的高度
    var ulBoxHeight = ulBox.offsetHeight;
    //静止状态的最小值和最大值
    var maxTop = 0;
    var minTop = left_contentHeight - ulBoxHeight;
    //console.log(minTop);
    // 滑动状态的最小值和最大值
    var maxSlipeTop = maxTop + 100;
    var minSlipeTop = minTop - 100;
    //拖拽事件
    var startY = 0,moveY = 0,distenceY=0,toltalY=0;
    ulBox.addEventListener("touchstart", function (e) {
      startY = e.targetTouches[0].clientY;
    })
    ulBox.addEventListener("touchmove", function (e) {
        moveY = e.targetTouches[0].clientY;
        distenceY = moveY-startY;
        //console.log(distenceY);
        //如果超出了滑动最大距离或最小距离
        if(toltalY+distenceY > maxSlipeTop || toltalY+distenceY  < minSlipeTop){
            return;
        }

        ulBox.style.transition = "none";
        ulBox.style.top = distenceY+toltalY+"px";
        //console.log(distenceY + toltalY);
    })
    ulBox.addEventListener("touchend", function (e) {

        //如果比最小值小就让其等于最小值
        if(distenceY+toltalY<minTop){
            toltalY = minTop;
            ulBox.style.transition = "top .5s";
            ulBox.style.top = minTop+"px";
        }
        //如果比最大值大就等于最大值
        else if(distenceY+toltalY>maxTop){
            toltalY = maxTop;
            ulBox.style.transition = "top .5s";
            ulBox.style.top = maxTop+"px";
        }
        else{
            toltalY+=distenceY;
        }
    })

    var lis = ulBox.querySelectorAll("li");
    //位每个li设置索引
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
    }
    //调用封装的拖动对象
    itcast.tap(ulBox,function (e) {
         for(var i=0;i<lis.length;i++){
         lis[i].classList.remove("active");
         }
        //为当前被单击的li元素添加样式
        //e.target是当前点击的元素
        //console.log(e.target);
        var li = e.target.parentNode;
        var liHeight = li.offsetHeight;
         li.classList.add("active");
        //当点击当前li要将li移到最上边
        var index = li.index;
        ulBox.style.transition = "top .5s";
        //当点击的li 使ul移动距离小于最小的距离时 等于最小距离
        if(-index*liHeight<minTop){
            ulBox.style.top = minTop+"px";
            toltalY = minTop;
        }
       else{
            ulBox.style.top = -index*liHeight+"px";
            toltalY = -index*liHeight;
        }
    })

};