<?php
/************* Model **********/
class Api_Model extends CI_Model {

	private $yUrl = 'https://www.googleapis.com/youtube/v3/videos';
    private $API_KEY = 'AIzaSyAV8VgDNNAuts_MuRILZt31UIaX_BI5Nw8';

	private $videoPath = "/var/www/videos/";
	private $imagePath = "/var/www/images/";

	function __construct(){
		parent::__construct();
		
     	}
	

	function get_cast_id2($id, $profile_path){
			$this->db->select("cast_id2", FALSE);
			$this->db->from('movie_casts');
			$this->db->where('movie_id', $id);
			$this->db->where('profile_path', $profile_path);
			$data = $this->db->get()->result();
	
			return $data;
	}

	function get_all_categories(){
		$this->db->select("*", FALSE);
		$this->db->from('categories');
		$data = $this->db->get()->result();

		return $data;
	}

	function get_all_contents(){
		$this->db->select("c.*, t.name as content_type ", FALSE);
		$this->db->from('contents c');
		$this->db->join('channels t', 'c.channel_id = t.id', 'left');
		
		$this->db->where('c.active',1);
		$this->db->order_by('title');
		$data = $this->db->get()->result();
		return $data;
	}

	function get_content($id){
		$this->db->select("c.*, t.name as content_type ", FALSE);
		$this->db->from('contents c');
		$this->db->join('channels t', 'c.channel_id = t.id', 'left');
		$this->db->where('c.id', $id);
		$data = $this->db->get()->result();
		return $data;
	}

	
	function get_video($id){
		$this->db->select("*", FALSE);
		$this->db->from('contents');
		$this->db->where('id',$id);
		$this->db->limit(1);
		$data = $this->db->get()->result();
		return $data;
	}

	function get_element_contents($id){
		$this->db->select("*", FALSE);
		$this->db->from('element_contents');
		$id = urldecode($id);
		$array = array('active' => 1);
		// Query by ID or Element_TYPE
		if (is_numeric($id)) {
			$array['element_id'] = $id;
		} else {
			$array['element_type'] = "$id";
		}
		$this->db->where($array);
		$this->db->order_by('name');
		$data = $this->db->get()->result();
		if ($id == 'Smell' | $id == 1) {
			$obj = array("Central Park" => [], "Cancun Stroll" => [], "Coffee 66" =>[], "Einstein" => []);
			//$obj = array();
			foreach ($data as $row) {
				if ($row->family == 'Central Park') {
					array_push($obj['Central Park'], $row);
				} else if ($row->family == 'Cancun Stroll') {
					array_push($obj['Cancun Stroll'], $row);
				} else if ($row->family == 'Coffee 66') {
					array_push($obj['Coffee 66'], $row);
				} else if ($row->family == 'Einstein') {
					array_push($obj['Einstein'], $row);
				}
			}
			return $obj;
			//return $data;
		} else {
			return $data;
		}
		
	}

	// Get contents by element page
	function get_element_contents_by_element($id){
		$this->db->select("*", FALSE);
		$this->db->from('element_contents');
		$id = urldecode($id);
		$array = array('active' => 1);
		// Query by ID or Element_TYPE
		if (is_numeric($id)) {
			$array['element_id'] = $id;
		} else {
			$array['element_type'] = "$id";
		}
		$this->db->where($array);
		$this->db->order_by('name');
		$data = $this->db->get()->result();
		return $data;
	}
/*select t.*,e.name elementname,ec.name element_title,ec.thumbnail from timelines2 t
left join elements e ON e.id=t.elementid
left join element_contents ec ON ec.id=t.element_content_id
where t.vid=2
*/


	function get_video_annotations($id){
		$this->db->select("t.*,e.name elementname,ec.name element_title,ec.code, ec.thumbnail ", FALSE);
		$this->db->from('timelines t');
		$this->db->join('elements e', 'e.id=t.elementid', 'left');
		$this->db->join('element_contents ec', 'ec.id=t.element_content_id', 'left');
		$this->db->where('vid',$id);
		$this->db->where('t.active',1);
		$data = $this->db->get()->result();
		
		foreach ($data as $row) {
			$t=$row->ctime;
			$row->current_time= sprintf('%02d:%02d:%02d', ($t/3600),($t/60%60), $t%60);

		}

		return $data;
	}

	function get_video_annotation_by_id($id){
		$this->db->select("t.*,e.name elementname,ec.name element_title,ec.code, ec.thumbnail ", FALSE);
		$this->db->from('timelines t');
		$this->db->join('elements e', 'e.id=t.elementid', 'left');
		$this->db->join('element_contents ec', 'ec.id=t.element_content_id', 'left');
		//$this->db->where('vid',$id);
		$this->db->where('t.id', $id);
		$this->db->where('t.active',1);
		$data = $this->db->get()->result();

		foreach ($data as $row) {
			$t=$row->ctime;
			$row->current_time= sprintf('%02d:%02d:%02d', ($t/3600),($t/60%60), $t%60);

		}
		return $data[0];
	}

	function get_hotspot($id){
		$this->db->select("t.*,e.name elementname,ec.name element_title,ec.code, ec.thumbnail ", FALSE);
		$this->db->from('timelines t');
		$this->db->join('elements e', 'e.id=t.elementid', 'left');
		$this->db->join('element_contents ec', 'ec.id=t.element_content_id', 'left');
		$this->db->where('vid',$id);
		$this->db->where('t.active',1);
		$this->db->order_by('t.ctime');
		$data = $this->db->get()->result();

		$obj = array("Smell" => [], "AR" => [], "VR" =>[], "Print3D" => [], "Touch3D" => []);
		//$obj = array();
		foreach ($data as $row) {
			$t=$row->ctime;
			$row->current_time= sprintf('%02d:%02d:%02d', ($t/3600),($t/60%60), $t%60);
			if ($row->elementname == 'Smell') {
				array_push($obj['Smell'], $row);
			} else if ($row->elementname == 'VR') {
				array_push($obj['VR'], $row);
			} else if ($row->elementname == 'AR') {
				array_push($obj['AR'], $row);
			} else if ($row->elementname == 'Print 3D') {
				array_push($obj['Print3D'], $row);
			} else if ($row->elementname == 'Touch 3D') {
				array_push($obj['Touch3D'], $row);
			}

		}

		return $obj;
	}


	// Insert video annotation
	function insert_annotation($d){

		$params=$d['data'];
 		if(!isset($params['duration'])){
 			$params['duration']=0;
 		}
	
		$data = array(
			   'vid' => $params['videoId'],
			   'elementid' => $params['elementId'],
			   'element_content_id' => $params['elementContentId'],
			   'ctime' => $params['currentTime'],
			   'duration' => $params['duration'],
			);
			$this->db->insert('timelines', $data); 
			$id = $this->db->insert_id();

			$data = $this->get_video_annotation_by_id($id);
			$vid = $params['videoId'];
			$vD = $this->get_content($vid);

			$title = $vD[0]->title;
			$video_path = $vD[0]->video_path;
			$genre = $vD[0]->genre;
			//md5(data[i]['title'] + data[i]['genre'] + data[i]['video_path']);
			$md5 = md5("$title$genre$video_path");
			$key = md5($data->ctime.$data->current_time.$data->duration.$data->element_title.$data->elementname);
			$res = array($md5 => $data, 'key' => $key, 'md5' => $md5);
			return $res;
	}

	function delete_annotation($d){
		$id = $d['data'];
		$data = $this->get_video_annotation_by_id($id);
		$content = $this->get_content($data->vid);
		$video_key = $content[0]->md5;
		$key = md5($data->ctime.$data->current_time.$data->duration.$data->element_title.$data->elementname);
		$this->db->trans_start();
		$this->db->where('t.id',$id);
		$this->db->update('timelines t',array('active'=>0));
		$this->db->trans_complete();
		$res = array("status" => 1, "key" => $key, "element" => $data->elementname, "video_key" => $video_key);
		return $res;
	}

	function get_all_elements(){
		$this->db->select("*", FALSE);
		$this->db->from('elements');
		$this->db->order_by('name');
		$data = $this->db->get()->result();
		return $data;
	}

	function delete_element_content($id){
		$this->db->where('id', $id);
		$this->db->update("element_contents", ["active" => 0]);
		
		return $id;
	}

	function insert_element_content($params){
		$data = $params['data'];
		

		$files = $data['files'];
		$image = null;
		$content = null;
		$et = strtolower($data['element_type']);
		$et = str_replace(' ', '_', $et);
		$imagePath = $this->imagePath . $et;
		$contentPath = $this->videoPath . $et;
        
		$http_image = null;
		$http_content = null;

		foreach( $files as $file) {
			if ($this->is_image($file)) {
				if (!file_exists($imagePath)) {
					mkdir($imagePath, 0777, true);
				}
				$image = "$imagePath/$file";
				rename("/tmp/$file", $image);
				$http_image = "/images/$et/$file";
			} else {
				$content = "$contentPath/$file";
				if (!file_exists($contentPath)) {
					mkdir($contentPath, 0777, true);
				}
				rename("/tmp/$file", $content);
				$http_content = "/videos/$et/$file";
			}
			//unlink("/tmp/$file");
		}

		$this->db->select('id');
		$this->db->from('elements');
		$this->db->where('name', $data['element_type']);
		$element_id = $this->db->get()->row()->id;
		//$element_id = $element_id[0]['id'];
		
		//return $element_id;

		$obj = array(
			'element_id' => $element_id,
			'element_type' => $data['element_type'],
			'name' => $data['name'],
			'thumbnail' => $http_image,
			'video_url' => $http_content,
			'video_duration' => isset($data['duration']) ? $data['duration'] : null
		);
		$this->db->insert('element_contents', $obj); 
		return $this->db->insert_id();
	}


	function insert_element_content_fb($params){
		$data = $params['data'];
		

		$files = $data['files'];
		$image = null;
		$content = null;
		$et = strtolower($data['element_type']);
		$et = str_replace(' ', '_', $et);
		$imagePath = $this->imagePath . $et;
		$contentPath = $this->videoPath . $et;
        
		$http_image = null;
		$http_content = null;

		foreach( $files as $file) {
			if ($this->is_image($file)) {
				if (!file_exists($imagePath)) {
					mkdir($imagePath, 0777, true);
				}
				$image = "$imagePath/$file";
				rename("/tmp/$file", $image);
				$http_image = "/images/$et/$file";
			} else {
				$content = "$contentPath/$file";
				if (!file_exists($contentPath)) {
					mkdir($contentPath, 0777, true);
				}
				rename("/tmp/$file", $content);
				$http_content = "/videos/$et/$file";
			}
			//unlink("/tmp/$file");
		}

		$this->db->select('id');
		$this->db->from('elements');
		$this->db->where('name', $data['element_type']);
		$element_id = $this->db->get()->row()->id;
		//$element_id = $element_id[0]['id'];
		
		//return $element_id;

		$obj = array(
			'element_id' => $element_id,
			'element_type' => $data['element_type'],
			'name' => $data['name'],
			'thumbnail' => $http_image,
			'video_url' => $http_content,
			'video_duration' => isset($data['duration']) ? $data['duration'] : null
		);
		
		return $obj;
	}

	function is_image($file) {
		$file = strtolower($file);
		if (preg_match('/(jpg|jpeg|gif|png)/', $file)) {
			return true;
		} else {
			return false;
		}
	}

	function get_element_id($type) {
		
		$this->db->select('id');
		$this->db->from('elements');
		$this->db->where('name', $type);
		$element_id = $this->db->get()->row()->id;

		return $element_id;
	}

	function create_content_categories() {
		$this->db->trans_start();
		$this->db->truncate('content_categories');
		$this->db->select("id, category_ids", FALSE);
		$this->db->from('contents c');
		$data = $this->db->get()->result();
		foreach ($data as $row) {
			$x=explode(',',$row->category_ids);
			foreach ($x as $value) {
				$data = array(
  					'content_id' => $row->id,
  					'category_id' => $value
				);
				$this->db->insert('content_categories', $data); 
			}

		}
		$this->db->trans_complete();

	}

	// Add youtube video
	public function upload_youtube_video($params) {
		$data = $params['data'];
		$url = $data['url'];
		$id = null;
        if (preg_match('/watch\?v=(.*)/', $url, $mat)) {
            $id = $mat[1];
        } elseif (preg_match('/youtu.be\/(.*)/', $url, $mat)) {
            $id = $mat[1];
        }
        
        if (!$id) {
            print("Not a valid URL $url");
            return false;
        }
        $fUrl = "$this->yUrl?id=$id&key=$this->API_KEY&part=snippet";
        $data = file_get_contents($fUrl);
        $json = json_decode($data, true);
        $items = $json['items'][0];
        $snippet = $items['snippet'];
        //$video_path = "https://www.youtube.com/watch?v=$id";
        $trialer = "";
        $title = $snippet['title'];
        $description = $snippet['description'];
        $thumbnail = $snippet['thumbnails']['standard']['url'];
        $background_image = "";
        $category = "Youtube";
        $content_type_id = $this->get_content_type_id($category);
		$channel_id = $this->get_channel_id($category);

        $video = array(
			'channel_id' => $channel_id,
			'content_type_id' => $content_type_id,
            'video_path' => $id,
			'title' => $title,
			'genre' => $category,
            'trailer' => $trialer,
            'thumbnail' => $thumbnail,
            'background_image' =>  $background_image,
            'short_description' => $description
        );
        $this->db->insert('contents', $video); 
	return $video;
		//return $this->db->insert_id();
	}

	// Add URL video
	public function upload_url_video($params) {
		//return $params;
		$request = $params['data'];
        $title = $request['title'];
        $description = $request['description'];
        $featured = $request['featured'];
        $categories = $request['categories'];
        // video
        $video_path = $request['video_path'];  
        // trailer
        $trailer = $request['trailer'];
       // thumbnail
        $thumbnail = $request['thumbnail'];
        // background
        $background_image = $request['background_image'];
        // Store in the database
        if ($featured) {
            array_push($categories, 'Featured');
        }
        $category = implode(", ", $categories);
		$content_type = $request['content_type'];
		$channel = $request['channel'];
		// chaneel id
		$content_type_id = $this->get_content_type_id($content_type);
		$channel_id = $this->get_channel_id($channel);

        $video = array(
			'channel_id' => $channel_id,
			'content_type_id' => $content_type_id,
            'video_path' => $video_path,
			'title' => $title,
			'genre' => $category,
            'trailer' => $trailer,
            'thumbnail' => $thumbnail,
            'background_image' => $background_image,
            'short_description' => $description
        );
        $this->db->insert('contents', $video); 
		return $this->db->insert_id();
    }


	// Add URL video
	public function upload_video($params) {
		//return $params;
		$request = $params['data'];
        $title = $request['title'];
        $description = $request['description'];
        $featured = $request['featured'];
        $categories = $request['categories'];
		$files = $request['files'];

		$background_image = null;
		$thumbnail = null;
		$video_path = null;
		$trailer = null;

		foreach($files as $file) {
			$ls = `ls -1 /tmp/$file*`;
			if (preg_match_all('/(\/tmp.*?)______(.*?)\n/', $ls, $ma)) {
				for ($i=0; $i<sizeOf($ma[0]); $i++) {
                    $source = rtrim($ma[0][$i]);
                    $destination = $ma[1][$i];
                    $type = $ma[2][$i];
					if ($type == 'background' | $type == 'thumbnail') {
						$dir = $this->imagePath . $type;
						// create dir if not exist
						if (!is_dir($dir)) {
							mkdir($dir, 0777, true);
						}
						// mv the file to trhe created dir
						rename($source, "$dir/$file");
						if ($type == 'background') {
							$background_image = "/images/$type/$file";
						} else {
							$thumbnail = "/images/$type/$file";
						}
					} else {
						$dir = $this->videoPath . $type;
						// create dir if not exist
						if (!is_dir($dir)) {
							mkdir($dir, 0777, true);
						}
						// mv the file to trhe created dir
						rename($source, "$dir/$file");
						if ($type == 'video') {
							$video_path = "/videos/$type/$file";
						} else {
							$trailer = "/videos/$type/$file";
						}
					}
                }
			}
		}
		
        if ($featured) {
            array_push($categories, 'Featured');
        }
        $category = implode(", ", $categories);
		$content_type = $request['content_type'];
		$channel = $request['channel'];
		// chaneel id
		$content_type_id = $this->get_content_type_id($content_type);
		$channel_id = $this->get_channel_id($channel);

        $video = array(
			'channel_id' => $channel_id,
			'content_type_id' => $content_type_id,
            'video_path' => $video_path,
			'title' => $title,
			'genre' => $category,
            'trailer' => $trailer,
            'thumbnail' => $thumbnail,
            'background_image' => $background_image,
            'short_description' => $description
        );
        $this->db->insert('contents', $video); 
		return $this->db->insert_id();
    }

	public function get_channel_id($name) {
		$this->db->select('id', FALSE);
		$this->db->from('channels');
		$this->db->where('name', $name);
		$id = $this->db->get()->row()->id;
		return $id;
	}

	public function get_content_type_id($name) {
		$this->db->select('id', FALSE);
		$this->db->from('content_types');
		$this->db->where('name', $name);
		$id = $this->db->get()->row()->id;
		return $id;
	}

	// temp - update md5 of content
	public function update_md5() {
		$this->db->select("*", FALSE);
		$this->db->from('contents');
		$data = $this->db->get()->result();

		foreach ($data as $row) {
			$title = $row->title;
			$video_path = $row->video_path;
			$id = $row->id;
			$md5 = md5("$id$title$video_path");
			$id = $row->id;

			$this->db->where('id', $id);
			$this->db->update("contents", ["md5" => $md5]);
		}
		return "success";
	}
}
