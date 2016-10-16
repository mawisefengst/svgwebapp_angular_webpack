import angular from 'angular';
import '../style/app.css';
import APP_DATA from "./data/json";
import controllers from "./controllers/controllers";
import directives from "./directives/directives";

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', directives.app)
  .directive('onSvg', directives.onSvg)
  .directive('detailViewItem', directives.detailViewItem)
  .directive('listItem', directives.listItem)
  .directive('stateList', directives.stateList)
  .controller('AppCtrl', controllers.AppCtrl)
  .controller('listItemCtrl', controllers.listItemCtrl)
  .controller('detailViewItemCtrl', controllers.detailViewItemCtrl);