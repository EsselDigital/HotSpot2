<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends MX_Controller {


	public function __construct(){
		parent::__construct();
		$this->load->model('api/api_model','api_model');
		//$this->load->model('api/Z5X_model','z5x_model');
		$this->load->helper('url');
	}


  public $xmlData = [];
    public function test() {
		$data =  $this->z5x_model->test();
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function getAllCategories() {
       
		$data =  $this->api_model->get_all_categories();
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}


	public function getAllContents() {
       
		$data =  $this->api_model->get_all_contents();
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}

	public function getContent($id) {
       
		$data =  $this->api_model->get_content($id);
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}


	public function deleteAnnotation() {
       	$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->delete_annotation($params);

		header("Content-type: application/json");
		echo json_encode($data);
	}

	public function insertAnnotation() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->insert_annotation($params);
 		header("Content-type: application/json");
		//echo "{\"id\":" . json_encode($data) . "}";
		echo json_encode($data);
	}


	public function getVideoAnnotations($id) {
		$data =  $this->api_model->get_video_annotations($id);
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}

	public function getVideoAnnotationById($id) {
		$data =  $this->api_model->get_video_annotation_by_id($id);
		$len = count($data);
		header("Content-type: application/json");
		echo json_encode($data);
	}
	

	public function getElementContents($id) {
       
		$data =  $this->api_model->get_element_contents($id);
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}

	public function getElementContentsByElement($id) {
       
		$data =  $this->api_model->get_element_contents_by_element($id);
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}

     public function getAllElements() {
		$data =  $this->api_model->get_all_elements();
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";

		//echo json_encode($data);
	}

	public function deleteElementContent($id) {
       
		$data =  $this->api_model->delete_element_content($id);
		header("Content-type: application/json");
		echo json_encode($data);
	}

	public function saveElementContent() {
		$file = $_FILES['content'];
    	$target = $file['name'];
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}
	

	public function saveElementImage() {
		$file = $_FILES['image'];
		$target = $file['name'];
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}

	public function insertElementContent() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->insert_element_content($params);
    
		header("Content-type: application/json");
		//echo "{\"id\":" . json_encode($data) . "}";
		json_encode($data);
	}

	public function insertElementContentFB() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->insert_element_content_fb($params);
    
		header("Content-type: application/json");
		//echo "{\"id\":" . json_encode($data) . "}";
		echo json_encode($data);
	}

	public function getElementId($type) {
		$data =  $this->api_model->get_element_id($type);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function createContentCategories() {
       
		$data =  $this->api_model->create_content_categories();
		$len = count($data);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	}

	public function getChannelId($name) {
		$data = $this->api_model->get_channel_id($name);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function getContentTypeId($name) {
		$data = $this->api_model->get_content_type_id($name);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function uploadYoutubeVideo() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->upload_youtube_video($params);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function uploadUrlVideo() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->upload_url_video($params);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function uploadVideo() {
		$params = json_decode(file_get_contents('php://input'),true);
		$data =  $this->api_model->upload_video($params);
		header("Content-type: application/json");
		echo "{\"data\":" . json_encode($data) . "}";
	}

	public function saveVideo() {
		$file = $_FILES['content'];
		$target = $file['name'] . "______video";
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}

	public function saveTrailer() {
		$file = $_FILES['trailer'];
		$target = $file['name'] . "______trailer";
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}

	public function saveThumbnail() {
		$file = $_FILES['thumbnail'];
		$target = $file['name'] . "______thumbnail";
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}

	public function saveBackgroundImage() {
		$file = $_FILES['background_image'];
		$target = $file['name'] . "______background";
		$tmp = $file['tmp_name'];
		if (is_uploaded_file($tmp)) {
			move_uploaded_file($tmp, "/tmp/$target");
		}
	}

	public function getHotspot($id) {
		$data =  $this->api_model->get_hotspot($id);
		$len = count($data);
		header("Content-type: application/json");
		echo json_encode($data);
	}

	//Temp - update md5
	public function updateMD5() {
		$data =  $this->api_model->update_md5();
		header("Content-type: application/json");
		echo json_encode($data);
	}

	public function getCastID2($id, $profile_path) {
		
		 $data =  $this->api_model->get_cast_id2($id, $profile_path);
		 $len = count($data);
		 header("Content-type: application/json");
		 echo "{\"data\":" . json_encode($data) . ", \"total\":\"$len\"}";
	 }
}
