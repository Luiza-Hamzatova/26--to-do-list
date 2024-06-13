const container = document.querySelector(".todo__items");
const btn = document.querySelector(".todo__add");
const input = document.querySelector(".todo__text");
const select = document.querySelector(".todo__options");

let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
let id = localStorage.getItem("id") ? +localStorage.getItem("id") : 0;
/*функция добавить задачу(сохр в localstorage)*/

const createTask = (event) => {
  event.preventDefault();
  if (input.value.trim() != "") {
    const date = new Date();
    tasks.push({
      value: input.value.trim(),
      date: date.toLocaleString(),
      isCompleted: false,
      id: id,
    });
    id++;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("id", JSON.stringify(id));
    renderTasks(tasks);
  }
  input.value = "";
};
/* добавление задачи в HTML  */

const renderTasks = (tasks) => {
  container.innerHTML = "";
  for (let task of tasks) {
    const taskContaiter = document.createElement("li");
    const taskSpan = document.createElement("span");
    const taskDate = document.createElement("span");
    const taskText = document.createElement("span");
    taskContaiter.classList.add(
      "todo__item",
      task.isCompleted ? "completed" : "sev"
    );
    taskContaiter.dataset.id = task.id;
    taskDate.classList.add("todo__date");
    taskSpan.classList.add("todo__task");
    taskText.innerText = task.value;
    taskDate.innerHTML = task.date;
    container.append(taskContaiter);
    taskContaiter.append(taskSpan);
    taskSpan.append(taskText);
    taskSpan.append(taskDate);
    taskSpan.innerHTML += `<span class="todo__action todo__action_complete"></span>
  <span class="todo__action todo__action_delete"></span>`;
  }
};
/* функция на кнопку удалить*/

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
};
/* функция на кнопку выполнено*/

const completeTask = (id) => {
  tasks = tasks.map((task) =>
    task.id === id
      ? {
          value: task.value,
          date: task.date,
          isCompleted: !task.isCompleted,
          id: task.id,
        }
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
};

/* функция определения кнопки в задаче(удалить или выполнено) */

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__action_delete")) {
    deleteTask(+event.target.parentElement.parentElement.dataset.id);
  } else if (event.target.classList.contains("todo__action_complete")) {
    completeTask(+event.target.parentElement.parentElement.dataset.id);
  }
});
/* функция отображения активных или выполненных задач */

const activeTasks = () => {
  let activeTask = tasks.filter((task) => !task.isCompleted);
  renderTasks(activeTask);
};
const completedTasks = () => {
  let completedTask = tasks.filter((task) => task.isCompleted);
  renderTasks(completedTask);
};
select.addEventListener("click", () => {
  if (select.value === "active") {
    activeTasks();
  }
  if (select.value === "completed") {
    completedTasks();
  } else {
    renderTasks(tasks);
  }
});

renderTasks(tasks);
btn.addEventListener("click", createTask);
