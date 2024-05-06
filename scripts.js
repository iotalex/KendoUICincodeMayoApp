
$(document).ready(function() {
    $("#addTodo").click(function() {
        var newTodo = $("#newTodo").val();
        if (newTodo.trim() !== "") {
            $("#todoItems").append("<li>" + newTodo + " <button class='delete-btn'>Delete</button></li>");
            $("#newTodo").val(""); // Clear the input after adding
        }
    });

    $(document).on("click", ".delete-btn", function() {
        $(this).parent().remove();
    });

    $("#tacoButton").click(function() {
        alert("🌮 It's Taco Time! 🌮");
    });
    app.get('/todos', (req, res) => {
        db.all("SELECT * FROM todos", [], (err, rows) => {
            if (err) {
                res.status(400).send(err.message);
                return;
            }
            res.json(rows); // This sends the todos data back as JSON
        });
    });
    $(document).ready(function() {
        // Fetch todos and render them
        function fetchTodos() {
            fetch('http://localhost:3001/todos')
                .then(response => response.json())
                .then(todos => {
                    $('#todoItems').empty(); // Clear current todos
                    todos.forEach(todo => {
                        $('#todoItems').append(`<li>${todo.item} <button class='delete-btn' data-id='${todo.id}'>Delete</button></li>`);
                    });
                })
                .catch(error => console.error('Error:', error));
        }
    
        // Initial fetch of todos
        fetchTodos();
    
        // Add todo
        $("#addTodo").click(function() {
            var newTodo = $("#newTodo").val();
            if (newTodo.trim() !== "") {
                fetch('http://localhost:3001/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item: newTodo })
                })
                .then(response => response.json())
                .then(() => {
                    fetchTodos(); // Re-fetch todos to update the list
                    $("#newTodo").val(""); // Clear the input after adding
                })
                .catch(error => console.error('Error:', error));
            }
        });
    
        // Delete todo
        $(document).on("click", ".delete-btn", function() {
            var id = $(this).data('id');
            fetch(`http://localhost:3001/todos/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                fetchTodos(); // Re-fetch todos to update the list
            })
            .catch(error => console.error('Error:', error));
        });
    });
    
    
});
        