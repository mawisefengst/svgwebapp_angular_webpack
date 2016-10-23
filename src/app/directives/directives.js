let onSvg = () => {
  return {
    restrict:'E',
    template: require('../templates/svg.html')
  }
};

let detailViewItem = () => {
  return {
    restrict:'E',
    scope:{
      detailViewObj : "="
    },
    template: require('../templates/detailView.html'),
    controller: 'detailViewItemCtrl',
    controllerAs: 'detailViewItemCtrl'
  }
};

let stateList = () => {
  return{
    restrict: "E",
    replace:true,
    template: "<span class=dropdown_state_items>{{state}}</span>",
    link: function($scope, element, attrs){
       element.on("click",function (event) {
         $scope.$apply(function(){
           $scope.$parent.filterState = $scope.state;
         });
       });
    }
  }
}

let categoryList = () => {
  return{
    restrict: "E",
    replace:true,
    template: "<span class=dropdown_state_items>{{category}}</span>",
    link: function($scope, element, attrs){
       element.on("click",function (event) {
         $scope.$apply(function(){
           //$scope.$parent.filterState = $scope.state;
           //alert($scope.category);
            $scope.$parent.filterCatogory = $scope.category;
         });
       });
    }
  }
}

let listItem = ($rootScope,$compile) => {
  return {
    restrict:'E',
    template: require('../templates/listItem.html'),
    controller: 'listItemCtrl',
    controllerAs: 'listItemCtrl',
    scope:{
      detailIndex : "=",
      repeatItem : "=",
      detailViewObj : "=",
      showIndex : "="
    },
    link: function($scope, element, attrs){
       /*element.on("click",function (event) {
          $scope.$apply(function(){
              $scope.detailIndex = 4; 
             //var detailIndex = $scope.$parent.AppCtrl.repeatItem.indexOf($scope.item);
             //$scope.$parent.repeatIndex = repeatIndex;
            // $scope.detailIndex =
          });
       });*/
    }
  }
};

let app = () => {
  return {
    restrict:'E',
    template: require('../app.html'),
    controller: 'AppCtrl',
    controllerAs: 'AppCtrl'
  }
};


let directives = {
    onSvg : onSvg,
    detailViewItem : detailViewItem,
    listItem : listItem,
    stateList : stateList,
    categoryList : categoryList,
    app : app
}

export default directives;