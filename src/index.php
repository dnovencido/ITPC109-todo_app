<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Takdang Aksyon 1.0</title>
        <!-- External style sheet -->
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <main>
            <section id="todo">
                <div id="todo-content" class="container card">
                    <h1>Takdang Aksyon 1.0</h1>
                    <form id="form-task" method="post">
                        <div id="todo-form">
                            <input id="todo-val" type="text" name="todo" class="todo-input" placeholder="Enter your task here...">
                            <input type="submit" id="add-task" class="btn btn-primary btn-md" value="Add">
                        </div>
                        <div id="todo-category">
                            <label for="category">Pick a category:</label>
                            <select name="category" id="category">
                                <option value="none" selected>None</option>
                                <option value="urgent">Urgent</option>
                                <option value="important">Important</option>
                                <option value="later">For Later</option>
                            </select>
                        </div>
                    </form>
                    <div id="todo-container">
                        <ul id="todo-list">
                        </ul>
                    </div>
                </div>
            </section>
        </main>
        <script src="js/script.js"></script>
    </body>
</html>