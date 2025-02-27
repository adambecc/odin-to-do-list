document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list");
  const todoList = document.getElementById("todo-list");
  const projectTitle = document.getElementById("project-title");
  const searchTodos = document.getElementById("search-todos");
  const projects = { Default: [] };

  document.getElementById("add-project").addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName && !projects[projectName]) {
      projects[projectName] = [];
      const projectItem = document.createElement("li");
      projectItem.textContent = projectName;
      projectItem.classList.add("project");
      projectList.appendChild(projectItem);
      switchProject(projectItem);
    } else if (projects[projectName]) {
      alert("Project already exists!");
    }
  });

  document.getElementById("add-todo").addEventListener("click", () => {
    const todoTitle = prompt("Enter todo title:");
    const todoDueDate = prompt("Enter due date (DD-MM-YYYY):");
    if (todoTitle) {
      const todoItem = { title: todoTitle, dueDate: todoDueDate, completed: false };
      const activeProjectName = document.querySelector(".project.active").textContent;
      projects[activeProjectName].push(todoItem);
      renderTodos(activeProjectName);
    }
  });

  searchTodos.addEventListener("input", () => {
    const searchTerm = searchTodos.value.toLowerCase();
    const activeProjectName = document.querySelector(".project.active").textContent;
    renderTodos(activeProjectName, searchTerm);
  });

  projectList.addEventListener("click", event => {
    if (event.target.classList.contains("project")) {
      switchProject(event.target);
    }
  });

  function switchProject(projectElement) {
    const activeProject = document.querySelector(".project.active");
    if (activeProject) activeProject.classList.remove("active");
    projectElement.classList.add("active");
    const projectName = projectElement.textContent;
    projectTitle.textContent = projectName;
    renderTodos(projectName);
  }

  function renderTodos(projectName, searchTerm = "") {
    todoList.innerHTML = "";
    projects[projectName]
      .filter(todo => todo.title.toLowerCase().includes(searchTerm))
      .forEach(todo => {
        const todoItem = document.createElement("li");
        todoItem.textContent = `${todo.title} (Due: ${todo.dueDate || "No Date"})`;
        if (todo.completed) todoItem.classList.add("completed");

        todoItem.addEventListener("click", () => {
          todo.completed = !todo.completed;
          renderTodos(projectName);
        });

        todoList.appendChild(todoItem);
      });
  }

  const defaultProject = document.querySelector(".project.active");
  if (defaultProject) switchProject(defaultProject);
});
