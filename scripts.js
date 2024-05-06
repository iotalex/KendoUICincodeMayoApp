
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
});
        