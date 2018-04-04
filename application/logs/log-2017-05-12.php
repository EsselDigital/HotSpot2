<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-05-12 18:13:58 --> 404 Page Not Found: ../modules/api/controllers/Api/index
ERROR - 2017-05-12 23:33:25 --> Query error: Unknown column 't.active' in 'where clause' - Invalid query: SELECT t.*, e.name elementname, ec.name element_title, ec.thumbnail
FROM `timelines` `t`
LEFT JOIN `elements` `e` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `ec`.`id`=`t`.`element_content_id`
WHERE `vid` = '87'
AND `t`.`active` = 1
