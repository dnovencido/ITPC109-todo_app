<?php
    include "models/task.php";

    $result = [];

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        $is_done = update_task($data['id'], $data['status']);

        if($is_done) {
            $result['done'] = true;
        } 
    }
 
    echo json_encode($result);
?>