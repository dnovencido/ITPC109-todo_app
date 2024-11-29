<?php
    include "models/task.php";
    
    $tasks = [];

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $tasks = get_all_tasks();
    }

    echo json_encode($tasks);
?>