<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2017-05-18 00:53:50 --> Severity: Warning --> Missing argument 1 for Api::getElementContents(), called in /vagrant/web/videoant/system/core/CodeIgniter.php on line 532 and defined /vagrant/web/videoant/application/modules/api/controllers/Api.php 76
ERROR - 2017-05-18 00:53:50 --> Severity: Notice --> Undefined variable: id /vagrant/web/videoant/application/modules/api/controllers/Api.php 78
ERROR - 2017-05-18 01:17:28 --> 404 Page Not Found: ../modules/api/controllers/Api/uploadYoutubeContent
ERROR - 2017-05-18 01:18:20 --> Severity: error --> Exception: Call to undefined method Api_Model::upload_youtube_content() /vagrant/web/videoant/application/modules/api/controllers/Api.php 143
ERROR - 2017-05-18 01:23:59 --> Severity: Notice --> Array to string conversion /vagrant/web/videoant/application/modules/api/controllers/Api.php 143
ERROR - 2017-05-18 01:28:21 --> Severity: Notice --> Array to string conversion /vagrant/web/videoant/application/modules/api/controllers/Api.php 143
ERROR - 2017-05-18 01:29:38 --> Severity: Notice --> Array to string conversion /vagrant/web/videoant/application/modules/api/controllers/Api.php 143
ERROR - 2017-05-18 01:42:41 --> Severity: Notice --> Undefined variable: obj /vagrant/web/videoant/application/modules/api/models/Api_model.php 267
ERROR - 2017-05-18 01:46:33 --> 404 Page Not Found: /index
ERROR - 2017-05-18 01:47:17 --> 404 Page Not Found: /index
ERROR - 2017-05-18 01:50:22 --> 404 Page Not Found: /index
ERROR - 2017-05-18 01:53:21 --> 404 Page Not Found: /index
ERROR - 2017-05-18 01:53:34 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:08:20 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:08:32 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:09:27 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:11:17 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:11:35 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:13:58 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:14:12 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:15:12 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:18:21 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:36:12 --> Query error: Unknown column 't.active' in 'where clause' - Invalid query: SELECT c.*, t.name as content_type
FROM `contents` `c`
LEFT JOIN `channels` `t` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `c`.`channel_id` = `t`.`id`
WHERE `t`.`active` = 1
ORDER BY `title`
ERROR - 2017-05-18 17:36:32 --> Query error: Unknown column 'e.id' in 'on clause' - Invalid query: SELECT c.*, t.name as content_type
FROM `contents` `c`
LEFT JOIN `channels` `t` ON `e`.`id`=`t`.`elementid`
LEFT JOIN `element_contents` `ec` ON `c`.`channel_id` = `t`.`id`
WHERE `c`.`active` = 1
ORDER BY `title`
ERROR - 2017-05-18 17:45:55 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:47:26 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:49:41 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:52:19 --> Severity: 4096 --> Object of class Api_Model could not be converted to string /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:52:19 --> Severity: Notice --> Undefined variable:  /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:52:19 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:52:19 --> Severity: error --> Exception: Call to a member function select() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:55:08 --> Severity: 4096 --> Object of class Api_Model could not be converted to string /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:55:08 --> Severity: Notice --> Undefined variable:  /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:55:08 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:55:08 --> Severity: error --> Exception: Call to a member function select() on null /vagrant/web/videoant/application/modules/api/models/Api_model.php 34
ERROR - 2017-05-18 17:55:28 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:55:48 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:57:18 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:58:05 --> 404 Page Not Found: /index
ERROR - 2017-05-18 17:59:37 --> 404 Page Not Found: /index
ERROR - 2017-05-18 21:25:25 --> Severity: error --> Exception: Call to private method Api_Model::upload_url_video() from context 'Api' /vagrant/web/videoant/application/modules/api/controllers/Api.php 150
ERROR - 2017-05-18 21:27:21 --> Severity: error --> Exception: Call to private method Api_Model::upload_url_video() from context 'Api' /vagrant/web/videoant/application/modules/api/controllers/Api.php 150
ERROR - 2017-05-18 21:27:55 --> Severity: error --> Exception: Call to private method Api_Model::upload_url_video() from context 'Api' /vagrant/web/videoant/application/modules/api/controllers/Api.php 150
ERROR - 2017-05-18 21:28:15 --> Severity: error --> Exception: Call to private method Api_Model::upload_url_video() from context 'Api' /vagrant/web/videoant/application/modules/api/controllers/Api.php 150
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: title /vagrant/web/videoant/application/modules/api/models/Api_model.php 280
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: description /vagrant/web/videoant/application/modules/api/models/Api_model.php 281
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: featured /vagrant/web/videoant/application/modules/api/models/Api_model.php 282
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: video_path /vagrant/web/videoant/application/modules/api/models/Api_model.php 285
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: trailer /vagrant/web/videoant/application/modules/api/models/Api_model.php 287
ERROR - 2017-05-18 21:28:57 --> Severity: Notice --> Undefined index: thumbnail /vagrant/web/videoant/application/modules/api/models/Api_model.php 289
ERROR - 2017-05-18 21:28:57 --> Severity: error --> Exception: Call to a member function input() on array /vagrant/web/videoant/application/modules/api/models/Api_model.php 291
ERROR - 2017-05-18 21:28:57 --> Severity: Warning --> Cannot modify header information - headers already sent by (output started at /vagrant/web/videoant/system/core/Exceptions.php:271) /vagrant/web/videoant/system/core/Common.php 570
ERROR - 2017-05-18 21:31:17 --> Severity: Notice --> Undefined index: title /vagrant/web/videoant/application/modules/api/models/Api_model.php 280
ERROR - 2017-05-18 21:31:17 --> Severity: error --> Exception: Call to a member function input() on array /vagrant/web/videoant/application/modules/api/models/Api_model.php 291
ERROR - 2017-05-18 21:35:26 --> Severity: error --> Exception: Call to a member function input() on array /vagrant/web/videoant/application/modules/api/models/Api_model.php 291
ERROR - 2017-05-18 21:36:15 --> Severity: error --> Exception: Class 'Video' not found /vagrant/web/videoant/application/modules/api/models/Api_model.php 298
ERROR - 2017-05-18 22:16:21 --> Severity: Notice --> Undefined property: CI_DB_mysqli_driver::$row /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:16:21 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:44 --> Severity: Notice --> Undefined property: CI_DB_mysqli_result::$row /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:44 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:45 --> Severity: Notice --> Undefined property: CI_DB_mysqli_result::$row /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:45 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:53 --> Severity: Notice --> Undefined property: CI_DB_mysqli_result::$row /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:17:53 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 316
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: title /vagrant/web/videoant/application/modules/api/models/Api_model.php 280
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: description /vagrant/web/videoant/application/modules/api/models/Api_model.php 281
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: video_path /vagrant/web/videoant/application/modules/api/models/Api_model.php 285
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: trailer /vagrant/web/videoant/application/modules/api/models/Api_model.php 287
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: thumbnail /vagrant/web/videoant/application/modules/api/models/Api_model.php 289
ERROR - 2017-05-18 22:46:10 --> Severity: Notice --> Undefined index: background_image /vagrant/web/videoant/application/modules/api/models/Api_model.php 291
ERROR - 2017-05-18 22:46:10 --> Severity: Warning --> Cannot modify header information - headers already sent by (output started at /vagrant/web/videoant/system/core/Exceptions.php:271) /vagrant/web/videoant/application/modules/api/controllers/Api.php 163
ERROR - 2017-05-18 22:52:36 --> Severity: Notice --> Undefined index: background_image /vagrant/web/videoant/application/modules/api/models/Api_model.php 291
ERROR - 2017-05-18 23:37:35 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 323
ERROR - 2017-05-18 23:37:35 --> Query error: Column 'channel_id' cannot be null - Invalid query: INSERT INTO `contents` (`channel_id`, `content_type_id`, `video_path`, `title`, `genre`, `trailer`, `thumbnail`, `background_image`, `short_description`) VALUES (NULL, '1', 'http://192.168.33.22/video/zee/MOM.mp4', 'test1', 'Comedy, Cooking, Health & Wellness, Promoted Shows, Featured', 'http://192.168.33.22/video/zee/MOM.mp4', 'http://192.168.33.22/img/zee/MOM.jpg', 'http://192.168.33.22/img/zee/MOM.jpg', 'v fffff')
ERROR - 2017-05-18 23:38:36 --> Severity: Notice --> Trying to get property of non-object /vagrant/web/videoant/application/modules/api/models/Api_model.php 331
ERROR - 2017-05-18 23:38:36 --> Query error: Column 'content_type_id' cannot be null - Invalid query: INSERT INTO `contents` (`channel_id`, `content_type_id`, `video_path`, `title`, `genre`, `trailer`, `thumbnail`, `background_image`, `short_description`) VALUES ('1', NULL, 'http://192.168.33.22/video/zee/MOM.mp4', 'test1', 'Comedy, Cooking, Health & Wellness, Promoted Shows, Featured', 'http://192.168.33.22/video/zee/MOM.mp4', 'http://192.168.33.22/img/zee/MOM.jpg', 'http://192.168.33.22/img/zee/MOM.jpg', 'v fffff')
ERROR - 2017-05-18 23:55:42 --> 404 Page Not Found: ../modules/api/controllers/Api/saveVideoContent
