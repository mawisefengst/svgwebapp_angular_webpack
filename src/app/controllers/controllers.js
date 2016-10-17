import APP_DATA from "../data/json";

class svgCtrl{
  constructor() {

  }
};

class listItemCtrl {
  constructor($scope, $compile, $element) {

  }
};


class detailViewItemCtrl{
  constructor($scope,$element) {
    this.title = "";
    this.closeBtn = function(notification){
      $element.removeClass('expand newExpand');
      if(screen.width< 740) $element.off('touchmove');
      delete $scope.$parent.repeatIndex;
      $element.remove();
    }
  }
}

class AppCtrl {
  constructor($scope, $element, $attrs, $transclude,$compile) {
    this.APP_DATA = APP_DATA;
    const PATCH_AMOUNT = 20;
    this.currentPatch = 1;
    this.repeatItem = this.APP_DATA.slice(0, this.currentPatch * PATCH_AMOUNT);
    this.loadmore = true;
    this.showState = "";
    this.showCategory = "";
    this.states = this.APP_DATA.map((style) => {
      return style.state
    });
    this.categories1 = this.APP_DATA.map((style) => {return style.look1_cat_name });
    this.categories2 = this.APP_DATA.map((style) => {return style.look2_cat_name });
    this.categories3 = this.APP_DATA.map((style) => {return style.look3_cat_name });
    this.categories4 = this.APP_DATA.map((style) => {return style.look4_cat_name });
    this.categories = this.categories1.concat(this.categories2,this.categories3,this.categories4);
    this.categories = this.categories.filter((item,pos) => {
      return this.categories.indexOf(item) == pos && item.length;
    });
    //console.log(this.categories);
    this.toggleState = function(){
        if(this.showState == "active") this.showState = "";
        else this.showState = "active";
        this.showCategories = "";
        this.loadmore = false;
    };

    this.toggleCategory = function(){
        if(this.showCategories == "active") this.showCategories = "";
        else this.showCategories = "active";
        this.showState = "";
        this.loadmore = false;
    };

    this.filter = function(section){
        this.repeatItem = this.APP_DATA.filter((styles) => {
          return styles.region.toLowerCase() === section;
        });
        this.states = this.repeatItem.map((style) => {
          return style.state
        });
        var elementResultOld = document.getElementsByClassName('detailView');
        angular.element(elementResultOld[0]).remove();
        delete $scope.repeatIndex;
        this.loadmore = false;
        this.showState = "";
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

    $scope.$watch("repeatIndex",function(newValue,oldValue){
       if(typeof newValue != "undefined"){
           var $compiledHtml = angular.element("<detail-view-item></<detail-view-item>");
           var $newScope = $scope.$new(true);
           $newScope.detailViewObj = $scope.AppCtrl.repeatItem[newValue];
           var newShowIndex = (Math.floor(newValue /4) + 1) * 4 ;
           if(typeof $newScope.detailViewObj != "undefined") $newScope.detailViewObj.showIndex = newShowIndex;
           var $compiledHtml_result = $compile($compiledHtml)($newScope);
           if(newShowIndex > $scope.AppCtrl.repeatItem.length) newShowIndex = $scope.AppCtrl.repeatItem.length
           var elementResult = document.getElementsByClassName("influencerImgWrapper")[newShowIndex - 1]
           if(typeof oldValue == "undefined"){
             angular.element(elementResult).after($compiledHtml_result);
           }else{
             var oldShowIndex = (Math.floor(oldValue /4) + 1) * 4 ;
             if(newShowIndex ===  oldShowIndex){
                elementResult = document.getElementsByClassName('detailView');
                angular.element(elementResult[0]).scope().detailViewObj = $newScope.detailViewObj;
             }else{
                var elementResultOld = document.getElementsByClassName('detailViewObj_' + oldShowIndex);
                angular.element(elementResultOld[0]).remove();
                angular.element(elementResult).after($compiledHtml_result);
             }
          }
        }
    });
    
    $scope.$watch("filterState",function(newValue,oldValue){
        if(newValue !== oldValue){
          var $this = $scope.AppCtrl;
          $this.repeatItem = $this.APP_DATA.filter((styles) => {
            return styles.state.toLowerCase() === newValue.toLowerCase();
          });
          var elementResultOld = document.getElementsByClassName('detailView');
          angular.element(elementResultOld[0]).remove();
          delete $this.repeatIndex;
        }
    });

    $scope.$watch("filterCatogory",function(newValue,oldValue){
       if(newValue !== oldValue){
          //alert(newValue);
          var $this = $scope.AppCtrl;
          $this.repeatItem = $this.APP_DATA.filter((styles) => {
            return styles.look1_cat_name.toLowerCase() === newValue.toLowerCase() ||
            styles.look2_cat_name.toLowerCase() === newValue.toLowerCase() ||
            styles.look3_cat_name.toLowerCase() === newValue.toLowerCase() ||
            styles.look4_cat_name.toLowerCase() === newValue.toLowerCase();
          });
          var elementResultOld = document.getElementsByClassName('detailView');
          angular.element(elementResultOld[0]).remove();
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