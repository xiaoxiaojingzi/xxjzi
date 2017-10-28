(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
  var app=angular.module('myApp',[]);
  app.controller('todoController',['$scope',function($scope){
    // 1 任务的展示
    $scope.todos = [
      {id:1,name:'吃饭',completed:true},
      {id:2,name:'睡觉',completed:true},
      {id:3,name:'打豆豆',completed:false},
      {id:4,name:'学习',completed:true},
      {id:5,name:'喝水',completed:false},
    ]
    //2 添加任务
    $scope.newTodo='';
    $scope.add=function(){
      if(!$scope.newTodo){
        return;
      }
     $scope.todos.push(
        {id:Math.random(),
        name:$scope.newTodo,
        completed:false
      }) 
     $scope.newTodo='';
    }
    //3 删除任务
    $scope.remove=function(id){
      for(var i=0;i<$scope.todos.length;i++){
        var item=$scope.todos[i];
        if(item.id===id){
          $scope.todos.splice(i,1);
          return;
        }
      }
    }

    //4. 修改任务内容
    $scope.isEditingId=-1;
    $scope.edit=function(id){
      $scope.isEditingId=id;
    };
    $scope.save=function(id){
      $scope.isEditingId=-1;
    }
    //5. 切换任务完成与否的状态
    //6. 批量切换任务完成与否的状态
    $scope.selectAll=false;
    $scope.toggleAll=function(){
      for (var  i = 0; i < $scope.todos.length ;i++) {
        var item = $scope.todos[i];
        item.completed=$scope.selectAll;
      }
    }
    //7. 显示未完成的任务数
    $scope.getActive=function(){
      var count=0;
      for(var i=0;i< $scope.todos.length;i++){
        var item=$scope.todos[i];
        if(!item.completed){
          count++;
        }
      }
      return count;
    }
    //8. 清除所有已完成任务
    $scope.clearAll=function(){
      for (var i = $scope.todos.length - 1; i >= 0; i--) {
        var item = $scope.todos[i];
        if(item.completed){
          $scope.todos.splice(i,1);
        }
      }
    }
  }])

})(window);