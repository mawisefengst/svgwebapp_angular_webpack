import APP_DATA from "../data/json";

class svgCtrl{
  constructor() {

  }
};

class listItemCtrl {
  constructor($scope, $compile, $element) {
     this.seeDetail =function(influencer_id, itemIndex){
        $scope.detailIndex = influencer_id - 1;
        var newShowIndex = (Math.floor((itemIndex) /4) + 1) * 4 ;
        $scope.showIndex = newShowIndex;
        $scope.detailViewObj = $scope.$parent.AppCtrl.APP_DATA[$scope.detailIndex];
     }
  }
};


class detailViewItemCtrl{
  constructor($scope,$element) {
    this.title = "";
    this.closeBtn = function(notification){
      $scope.$parent.$parent.$parent.showIndex = 0;
      $scope.$parent.$parent.$parent.detailIndex = 0;
    }
  }
}

class AppCtrl {
  constructor($scope, $element, $attrs, $transclude,$compile) {
    this.APP_DATA = APP_DATA;
    const PATCH_AMOUNT = 20;
    this.currentPatch = 1;
    this.repeatItem = this.APP_DATA.slice(0, this.currentPatch * PATCH_AMOUNT);
    this.repeatItem = this.repeatItem.map((style,key) => {
        return Object.assign({},style,{itemIndex :key});
    });
    this.detailIndex = 0;
    this.showIndex = 0;
    this.detailViewObj = this.APP_DATA[this.detailIndex];
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
        this.repeatItem = this.repeatItem.map((style,key) => {
          return Object.assign({},style,{itemIndex :key});
        });

        this.states = this.repeatItem.map((style) => {
          return style.state
        });
        this.detailIndex = 0;
        this.showIndex = 0;
        this.loadmore = false;
        this.showState = "";
        this.detailViewObj = [];
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