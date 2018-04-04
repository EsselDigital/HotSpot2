<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-05-09 16:41:50 --> Severity: Notice --> Undefined index: duration /vagrant/web/videoant/application/modules/api/models/Api_model.php 87
ERROR - 2017-05-09 17:55:30 --> Severity: Notice --> Undefined index: duration /vagrant/web/videoant/application/modules/api/models/Api_model.php 87
ERROR - 2017-05-09 17:59:02 --> Severity: Notice --> Undefined index: duration /vagrant/web/videoant/application/modules/api/models/Api_model.php 87
ERROR - 2017-05-09 18:00:05 --> Severity: Notice --> Undefined index: duration /vagrant/web/videoant/application/modules/api/models/Api_model.php 87
ERROR - 2017-05-09 19:04:52 --> Query error: Column 'active' in where clause is ambiguous - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.thumbnail
FROM `timelines2` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `active` = 1
ERROR - 2017-05-09 20:42:44 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:43:25 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:44:07 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:45:04 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:45:22 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:45:55 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:46:15 --> 404 Page Not Found: /index
ERROR - 2017-05-09 20:55:48 --> Severity: Warning --> Missing argument 1 for Api::deleteAnnotation(), called in /vagrant/web/videoant/system/core/CodeIgniter.php on line 532 and defined /vagrant/web/videoant/application/modules/api/controllers/Api.php 47
ERROR - 2017-05-09 20:55:48 --> Severity: Warning --> Illegal string offset 'id' /vagrant/web/videoant/application/modules/api/models/Api_model.php 99
ERROR - 2017-05-09 20:55:55 --> Severity: Warning --> Missing argument 1 for Api::deleteAnnotation(), called in /vagrant/web/videoant/system/core/CodeIgniter.php on line 532 and defined /vagrant/web/videoant/application/modules/api/controllers/Api.php 47
ERROR - 2017-05-09 20:55:55 --> Severity: Warning --> Illegal string offset 'id' /vagrant/web/videoant/application/modules/api/models/Api_model.php 99
ERROR - 2017-05-09 20:55:56 --> Severity: Warning --> Missing argument 1 for Api::deleteAnnotation(), called in /vagrant/web/videoant/system/core/CodeIgniter.php on line 532 and defined /vagrant/web/videoant/application/modules/api/controllers/Api.php 47
ERROR - 2017-05-09 20:55:56 --> Severity: Warning --> Illegal string offset 'id' /vagrant/web/videoant/application/modules/api/models/Api_model.php 99
ERROR - 2017-05-09 20:56:59 --> Severity: Warning --> Illegal string offset 'id' /vagrant/web/videoant/application/modules/api/models/Api_model.php 99
