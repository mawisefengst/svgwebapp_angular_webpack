let onSvg = () => {
  return {
    restrict:'E',
    template: require('../templates/svg.html')
  }
};

let detailViewItem = () => {
  return {
    restrict:'E',
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

let listItem = ($rootScope,$compile) => {
  return {
    restrict:'E',
    template: require('../templates/listItem.html'),
    replace:true,
    controller: 'listItemCtrl',
    controllerAs: 'listItemCtrl',
    link: function($scope, element, attrs){
       element.on("click",function (event) {
          $scope.$apply(function(){
             var repeatIndex = $scope.$parent.AppCtrl.repeatItem.indexOf($scope.item);
             $scope.$parent.repeatIndex = repeatIndex;
          });
       });


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
    app : app
}

export default directives;