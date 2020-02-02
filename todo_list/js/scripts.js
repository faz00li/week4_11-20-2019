


function Task(name, description) {
  this.name = name,
  this.description = description,
  this.id = 0;
}

function TaskList(){
  this.list = [],
  this.currentId = 0
}

TaskList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.list.push(task);
}

TaskList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TaskList.prototype.findTask = function(id) {
  for (var i = 0; i < this.list.length; i++) {
    if(this.list[i]) {
      if(this.list[i].id == id) {
        return this.list[i];
      }
    }
  };
  return false;
}

TaskList.prototype.deleteTask = function(id) {
  console.log("attempting to delete id: " + id);
  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i]) {
      if (this.list[i].id == id) {

        delete this.list[i];

        return true;
      }
    }
  };
  return false;
}

TaskList.prototype.printList = function() {
  for (var i = 0; i < this.list.length; i++)
    if(this.list[i])
     console.log("array element: " + i + " id number: " + this.list[i].id + " name: " + this.list[i].name + " : " + this.list[i].description);
    else
      console.log("array element: " + i + " is empty");
}

// ------------------------------ User Interface Logic

var taskList = new TaskList();

function displayTaskDetails(taskList) {

  var list = $("ul#tasks");
  var htmlForListItem = "";
  var indexOfLastTask = taskList.list.length - 1;
  // console.log(indexOfLastTask);

  htmlForListItem = "<li id=" + taskList.list[indexOfLastTask].id + ">" + taskList.list[indexOfLastTask].name + "   -----   </ >";
  list.append(htmlForListItem);

  // taskList.list.forEach(function(task) {
  //   htmlForListItem = "<li id=" + task.id + ">" + task.name + "</li>";
  // });

  //list.html(htmlForListItem);

}

function attachTaskListeners() {

 $("ul#tasks").on("click", "li",  function(){
    showTask(this.id);
  });

  $("#buttons").on("click", ".delete-btn", function(){
    console.log("listner id: " + this.id);

    console.log(taskList.deleteTask(this.id));

    console.log("list post deletion: ")
    taskList.printList();

    // console.log("list post delete" + taskList.printList());

    $("#show-task").hide();
    refreshTaskList();
  });
}

function showTask(taskId) {
  task = taskList.findTask(taskId);
  $("#show-task").show();
  $(".task-name").html(task.name);
  $(".task-description").html(task.description);
  var buttons = $("#buttons");
  buttons.empty();
  $("#buttons").append("<button class='delete-btn' id=" + task.id + ">Delete</button>" );

}

function refreshTaskList() {
  var list = $("ul#tasks");
  var htmlForListItem = "";

  taskList.list.forEach(function(task) {
    htmlForListItem += "<li id=" + task.id + ">" + task.name + "   -----   </li>";
  })

  console.log(htmlForListItem);

  list.html(htmlForListItem);
}


$(document).ready(function() {

  attachTaskListeners();

  $("form#new-task").submit( function(event) {


    event.preventDefault();

    var taskName = $("input#task-name").val();
    var taskDescription = $("input#task-description").val();
    $("input#task-name").val("");
    $("input#task-description").val("");

    var newTask = new Task(taskName, taskDescription);
    taskList.addTask(newTask);

    displayTaskDetails(taskList);



  });
});

// write intergace logic
