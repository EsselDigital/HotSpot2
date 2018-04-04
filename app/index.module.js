/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { PressController } from './press/press.controller';
import { AboutController } from './about/about.controller';
import { JobsController } from './jobs/jobs.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
angular.module('myFrontend', ['ui.router', 'ui.bootstrap', 'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('JobsController', JobsController)
  .controller('PressController', PressController)
  .directive('acmeNavbar', NavbarDirective)
 