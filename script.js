document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list");
    const todoList = document.getElementById("todo-list");
    const projectTitle = document.getElementById("project-title");
  
    // Store projects and todos in an object
    const projects = {
      Default: [],
    };
  
    // Add Project Functionality
    document.getElementById("add-project").addEventListener("click", () => {
      const projectName = prompt("Enter project name:");
      if (projectName && !projects[projectName]) {
        projects[projectName] = []; // Create a new project
        const projectItem = document.createElement("li");
        projectItem.textContent = projectName;
        projectItem.classList.add("project");
        projectList.appendChild(projectItem);
        switchProject(projectItem);
      } else if (projects[projectName]) {
        alert("Project already exists!");
      }
    });
  
    // Add Todo Functionality
    document.getElementById("add-todo").addEventListener("click", () => {
      const todoTitle = prompt("Enter todo title:");
      if (todoTitle) {
        const todoItem = {
          title: todoTitle,
          completed: false,
        };
  
        const activeProjectName = document.querySelector(".project.active").textContent;
        projects[activeProjectName].push(todoItem);
  
        renderTodos(activeProjectName);
      }
    });
  
    // Switch Project
    projectList.addEventListener("click", (event) => {
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
  
    // Render Todos for the selected project
    function renderTodos(projectName) {
      todoList.innerHTML = ""; // Clear existing todos
      projects[projectName].forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = todo.title;
        if (todo.completed) {
          todoItem.classList.add("completed");
        }
  
        // Mark as completed on click
        todoItem.addEventListener("click", () => {
          todo.completed = !todo.completed;
          renderTodos(projectName); // Re-render todos
        });
  
        todoList.appendChild(todoItem);
      });
    }
  
    // Default Project Selection
    const defaultProject = document.querySelector(".project.active");
    if (defaultProject) {
      switchProject(defaultProject);
    }
  });
  