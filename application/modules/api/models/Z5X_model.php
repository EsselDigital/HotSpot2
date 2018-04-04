<?php
/************* Model **********/
class Z5X_Model extends CI_Model {

	function __construct(){
		parent::__construct();
		
    }

    public function insert() {
        $this->db->select('*', FALSE);
        $old = $this->db-from('content')
    }

}
	