const formTask = document.getElementById("form-task");
const task = document.getElementById("todo-val");
const categorySel = document.getElementById("category");
const todoList = document.getElementById("todo-list");

window.addEventListener("load", function() {
    fetchTasks();
    checkEmpty();
    removeTaskFromList();
});


formTask.addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(formTask);

    if(formData.get('todo').value != "")
        addTask(formData);
});

function addTask(formData) {
    if(task.value != "") {
        fetch(`/add.php`, {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(function(response) {
            return response.json(); 
        }).then(function(data) {        
            if(data.saved) {
                renderTask({id: data.details.id, task: data.details.task, category: data.details.category, is_done: data.details.is_done});
                task.value = "";
            }
        }).catch(function(e) { 
            console.log(e)
        })   
    }
}

function renderTask(obj) {
    var todoListItem = document.createElement("li");
    todoListItem.setAttribute("class", "todo-item");
    
    // Todo description
    var todoDescription = document.createElement("span");  
    todoDescription.setAttribute("class", "todo-description");

    var todoCheckBox = document.createElement("input");
    todoCheckBox.setAttribute("type", "checkbox");
    todoCheckBox.setAttribute("class", "todo-checkbox");
    todoCheckBox.setAttribute("data-id", obj.id);
    var todoDescriptionText = document.createTextNode(obj.task);

    todoDescription.appendChild(todoCheckBox);
    todoDescription.appendChild(todoDescriptionText);
    
    if(obj.is_done == 'T') {
        todoDescription.classList.add("done");
        todoCheckBox.checked = true;
    }
      
    //Todo action button
    var todoAction = document.createElement("span");  
    todoAction.setAttribute("class", "todo-action");

    var todoBtn = document.createElement("button");
    todoBtn.setAttribute("class", "btn btn-sm btn-secondary btn-remove");
    todoBtn.setAttribute("data-id", obj.id);
    var todoBtnText = document.createTextNode("Remove");

    todoBtn.appendChild(todoBtnText);
    todoAction.appendChild(todoBtn);

    // Add todo description and button to list item
    todoListItem.appendChild(todoDescription);
    todoListItem.appendChild(todoAction);

    // Add class for specific category
    if(obj.category!= "none") 
        todoListItem.classList.add(obj.category);

    // List item with an id of todo-empty
    var listTodoEmpty = document.getElementById("todo-empty");

    // Remove  list item with an id of todo-empty
    if(listTodoEmpty)
        todoList.innerHTML = "";

    todoList.appendChild(todoListItem);
      
    //Mark as done
    markAsDone(todoCheckBox);

    //Remove an item
    remove(todoBtn);
}

function markAsDone(object) {
    object.addEventListener("click", function(){
        var item = object.parentElement;
        var id = this.getAttribute("data-id");
        var status = this.checked ? 'T' : 'F';

        fetch(`done.php`, {
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, status: status}),
        }).then(function(response) {
            return response.json(); 
        }).then(function(data) {
            if (data.done) {
                if(status === 'T') 
                    item.classList.add("done");
                else 
                    item.classList.remove("done");
            } 
        }).catch(function(e) { 
            console.log(e)
        });
    });
}

function remove(object) {
    object.addEventListener("click", function() {
        var confirm_res = confirm("Do you want to remove this task?");
        
        if(confirm_res)
            var btn = this;
            var id = this.getAttribute("data-id");

            fetch(`delete.php?id=${id}`, {
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function(response) {
                return response.json(); 
            }).then(function(data) {
                if(data.deleted)
                    btn.closest('li').remove();
                    checkEmpty();
            }).catch(function(e) { 
                console.log(e)
            });

        checkEmpty();
    })
}

function checkEmpty() {
    var todoItem = document.getElementsByClassName("todo-item");

    if(todoItem.length == 0) {

        todoList.innerHTML = "";

        var listTodoEmpty = document.createElement("li");
        listTodoEmpty.setAttribute("id", "todo-empty");
        
        var listTodoEmptyDescription = document.createTextNode("Task will be placed here.");

        listTodoEmpty.appendChild(listTodoEmptyDescription);
        todoList.appendChild(listTodoEmpty);
    } 

}

function removeTaskFromList() {
    var todoItems = document.getElementsByClassName("btn-remove");

    // Bind even for all of the button with a class name btn-remove
    for (let i=0; i< todoItems.length; i++) {
        remove(todoItems[i]);
    }
}

function fetchTasks() { 
    fetch(`tasks.php`, {
        method:'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function(response) {
        return response.json(); 
    }).then(function(data) {
        data.forEach(row => {
           renderTask({id: row.id, task: row.todo, category: row.category, is_done: row.is_done});
        });
    }).catch(function(e) { 
        console.log(e)
    })   
}


