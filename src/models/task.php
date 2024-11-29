<?php
    require "db/db.php";

    function save_task($todo, $category) {
        global $conn;

        $task = [];

        $date_created = date("Y-m-d H:i:s");
        $query = "INSERT INTO `tasks` (`todo`,  `category`, `created_at`) VALUES ('".$conn->real_escape_string($todo)."', '".$conn->real_escape_string($category)."', '".$date_created."')";
        
        if ($conn->query($query)) {
            $id = $conn->insert_id;
            $query = "SELECT * FROM `tasks` WHERE `tasks`.`id` = '".$id."'";

            if ($result = $conn->query($query)) {
                $task= $result->fetch_array(MYSQLI_ASSOC);
            }
        }

        return $task;  
    }

    function get_all_tasks() {
        global $conn;
        $tasks = [];

        $query = "SELECT * FROM `tasks`";

        if ($result = $conn->query($query)) {
            $tasks = $result->fetch_all(MYSQLI_ASSOC);
        }

        return $tasks;
    }  

    function delete_task($id) {
        global $conn;
        $flag = false;

        $query = "SELECT * FROM `tasks` as `t` WHERE `t`.`id` = '".$conn->real_escape_string($id)."'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $task = $result->fetch_array(MYSQLI_ASSOC);

            $query = "DELETE FROM `tasks` as `t` WHERE `t`.`id` = '".$task['id']."'";

            if ($conn->query($query)) {
                $flag = true;
            }
        }

        return $flag;
    }  

    function update_task($id, $status) {
        global $conn;
        $flag = false;

        $query = "SELECT * FROM `tasks` as `t` WHERE `t`.`id` = '".$conn->real_escape_string($id)."'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            $task = $result->fetch_array(MYSQLI_ASSOC);

            $query = "UPDATE `tasks` as `t` SET `t`.`is_done` = '".$status."' WHERE `t`.`id` = '".$task['id']."'";

            if ($conn->query($query)) {
                $flag = true;
            }
        }

        return $flag;
    }
?>