<?php
    include "models/task.php";
    
    $result = [];

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $task = save_task($_POST['todo'], $_POST['category']);

        if(!empty($task)) {
            $task = [
                'id' => $task['id'],
                'task' => $task['todo'],
                'category' => $task['category'],
                'is_done' => $task['is_done']
            ];

            $result = [
                'saved' => true,
                'details' => $task
            ];
        } 
    }

    echo json_encode($result);
?>