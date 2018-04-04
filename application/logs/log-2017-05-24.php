<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-05-24 18:42:43 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:42:43 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:42:43 --> Severity: error --> Exception: Call to a member function groupBy() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:42:55 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:42:55 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:42:55 --> Severity: error --> Exception: Call to a member function groupBy() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:15 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:15 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:15 --> Severity: error --> Exception: Call to a member function groupby() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:57 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:57 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:57 --> Severity: error --> Exception: Call to a member function group_by() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:59 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:59 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:43:59 --> Severity: error --> Exception: Call to a member function group_by() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 18:45:54 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'videoant_db.t.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `t`.`active` = 1
GROUP BY `ec`.`name`
ERROR - 2017-05-24 18:46:33 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'videoant_db.t.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '1'
AND `t`.`active` = 1
GROUP BY `ec`.`name`
ERROR - 2017-05-24 18:47:31 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'videoant_db.t.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `t`.`active` = 1
GROUP BY `ec`.`name`
ERROR - 2017-05-24 18:59:52 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'videoant_db.t.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `t`.`active` = 1
GROUP BY `ec`.`name`
ERROR - 2017-05-24 19:00:51 --> Query error: Unknown column 't.element_id' in 'group statement' - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `t`.`active` = 1
GROUP BY `t`.`element_id`
ERROR - 2017-05-24 19:01:19 --> Query error: Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'videoant_db.t.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.code, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '2'
AND `t`.`active` = 1
GROUP BY `t`.`elementid`
ERROR - 2017-05-24 19:05:59 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:05:59 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:05:59 --> Severity: error --> Exception: Call to a member function order_by() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:01 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:01 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:01 --> Severity: error --> Exception: Call to a member function order_by() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:33 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:33 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:33 --> Severity: error --> Exception: Call to a member function order_by() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:45 --> Severity: Notice --> Undefined variable: his /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:45 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:06:45 --> Severity: error --> Exception: Call to a member function orderby() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 103
ERROR - 2017-05-24 19:12:35 --> Severity: error --> Exception: Call to undefined function append() /vagrant/web/videoant/application/modules/api/models/Api_model.php 112
ERROR - 2017-05-24 19:15:50 --> Severity: Notice --> Undefined index: Smell /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:15:50 --> Severity: error --> Exception: Call to undefined function push() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:16:18 --> Severity: Notice --> Undefined index: Smell /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:16:18 --> Severity: error --> Exception: Call to undefined function push() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:18:11 --> Severity: Notice --> Undefined index: Smell /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:18:11 --> Severity: error --> Exception: Call to undefined function push() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:18:21 --> Severity: error --> Exception: Call to undefined function push() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:18:58 --> Severity: error --> Exception: Call to undefined function add() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
ERROR - 2017-05-24 19:19:07 --> Severity: error --> Exception: Call to undefined function append() /vagrant/web/videoant/application/modules/api/models/Api_model.php 113
