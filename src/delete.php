<?php
    include "models/task.php";
    
    $result = [];

    if(array_key_exists("id", $_GET)) {
        $result['deleted'] = false;
        $is_deleted = delete_task($_GET['id']);

        if($is_deleted) {
            $result['deleted'] = true;
        } 
    }

    echo json_encode($result);
?>