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
             /*var $compiledHtml = angular.element("<detail-view-item></<detail-view-item>");
             var $newScope = $scope.$new(true);
             $newScope.detailViewObj = $scope.item;
             $newScope.state = $scope.item.state;
             var $compiledHtml_result = $compile($compiledHtml)($newScope);*/
             var repeatIndex = $scope.$parent.AppCtrl.repeatItem.indexOf($scope.item);
             //$scope.$parent.showIndex =  showIndex;
             $scope.$parent.repeatIndex = repeatIndex;
             /*
             var showIndex = (Math.floor(repeatIndex /4) + 1) * 4 ;
             $scope.listItemCtrl.index = showIndex;
             $newScope.detailViewObj.showIndex = showIndex;
             var elementResult = document.getElementsByClassName('item_' + showIndex);
             if($scope.$parent.showIndex ===  showIndex){
                elementResult = document.getElementsByClassName('detailView');
                angular.element(elementResult[0]).scope().detailViewObj = $scope.item;
             }else{
               $scope.$parent.showIndex =  showIndex;
               angular.element(elementResult[0]).after($compiledHtml_result);
             }
             */

          });
       });
       //close button and scroll
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
    app : app
}

export default directives;