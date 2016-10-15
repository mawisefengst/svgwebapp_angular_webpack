import APP_DATA from "../data/json";

class svgCtrl{
  constructor() {
    this.title = "";
  }
};

class listItemCtrl {
  constructor($scope, $compile, $element) {
    this.title = "dd";
    this.seeDetail = function(id){
         /*var $compiledHtml = angular.element("<detail-view-item></<detail-view-item>");
         var $newScope = $scope.$new(true);
         $newScope.detailViewObj = $scope.item;
         $newScope.state =$scope.item.state;
         console.log($newScope.state);
         var $compiledHtml_result = $compile($compiledHtml)($newScope);
         $element.after($compiledHtml_result);*/
    };
  }
};


class detailViewItemCtrl{
  constructor($scope,$element) {
    this.title = "";
    this.closeBtn = function(notification){
      $element.removeClass('expand newExpand');
      if(screen.width< 740) $element.off('touchmove');
      //$scope.$parent.repeatIndex = -1;
      delete $scope.$parent.repeatIndex;
      $element.remove();
    }
  }
}

class AppCtrl {
  constructor($scope, $element, $attrs, $transclude,$compile) {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.title = "Hello from webpack from AngularJs";
    this.APP_DATA = APP_DATA;
    const PATCH_AMOUNT = 20;
    this.currentPatch = 1;
    this.repeatItem = this.APP_DATA.slice(0, this.currentPatch * PATCH_AMOUNT);
    this.loadmore = true;
    this.filter = function(section){
        this.repeatItem = APP_DATA.filter((styles) => {
          return styles.region.toLowerCase() === section;
        });
    };
    this.loadmore = function(){
      if((this.currentPatch + 1) * PATCH_AMOUNT > this.APP_DATA.length){
          this.loadmore = false;
          this.repeatItem = this.repeatItem.concat(this.APP_DATA.slice(this.currentPatch * PATCH_AMOUNT, this.APP_DATA.length));
      }else{
          this.repeatItem = this.repeatItem.concat(this.APP_DATA.slice(this.currentPatch * PATCH_AMOUNT, (this.currentPatch + 1) * PATCH_AMOUNT));
          this.currentPatch++;
      }
    };
    /*
    $scope.$watch("showIndex",function(newValue,oldValue){
        if(typeof oldValue != "undefined" && oldValue !== -1){
          var elementResult = document.getElementsByClassName('detailViewObj_'+ oldValue);
          angular.element(elementResult[0]).scope().detailViewItemCtrl.closeBtn("notification");
        }
    });
    */

    $scope.$watch("repeatIndex",function(newValue,oldValue){
       // console.log(newValue);
       // console.log(oldValue);
       if(typeof newValue != "undefined"){
           var $compiledHtml = angular.element("<detail-view-item></<detail-view-item>");
           var $newScope = $scope.$new(true);
           //$scope.AppCtrl.repeatItem[newValue].showIndex = newShowIndex;
           $newScope.detailViewObj = $scope.AppCtrl.repeatItem[newValue];
           var newShowIndex = (Math.floor(newValue /4) + 1) * 4 ;
           if(typeof $newScope.detailViewObj != "undefined") $newScope.detailViewObj.showIndex = newShowIndex;
           var $compiledHtml_result = $compile($compiledHtml)($newScope);
           if(newShowIndex > $scope.AppCtrl.repeatItem.length) newShowIndex = $scope.AppCtrl.repeatItem.length
           var elementResult = document.getElementsByClassName('item_' + newShowIndex);
           if(typeof oldValue == "undefined" || oldValue == -1){
             angular.element(elementResult[0]).after($compiledHtml_result);
           }else{
             var oldShowIndex = (Math.floor(oldValue /4) + 1) * 4 ;
            // $scope.listItemCtrl.index = showIndex;
             if(newShowIndex ===  oldShowIndex){
                elementResult = document.getElementsByClassName('detailView');
                angular.element(elementResult[0]).scope().detailViewObj = $newScope.detailViewObj;
             }else{
                var elementResultOld = document.getElementsByClassName('detailViewObj_' + oldShowIndex);
                angular.element(elementResultOld[0]).remove();
                angular.element(elementResult[0]).after($compiledHtml_result);
             }
          }
        }
    });








  }
};



let controllers = {
    AppCtrl : AppCtrl,
    detailViewItemCtrl : detailViewItemCtrl,
    listItemCtrl : listItemCtrl,
    svgCtrl : svgCtrl
}

export default controllers;