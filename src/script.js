const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

// Adicionar categorias e tarefas js

let categories = [
    {
      title: "Pessoal",
      img: "boy.png",
    },
    {
      title: "Trabalho",
      img: "briefcase.png",
    },
    {
      title: "Compras",
      img: "shopping.png",
    },
    {
      title: "Coding",
      img: "web-design.png",
    },
    {
      title: "Saúde",
      img: "healthcare.png",
    },
    {
      title: "Fitness",
      img: "dumbbell.png",
    },
    {
      title: "Estudos",
      img: "education.png",
    },
    {
      title: "Financeiro",
      img: "saving.png",
    },
  ];
  
  let tasks = [
    {
      id: 1,
      task: "Ir ao mercado",
      category: "Compras",
      completed: false,
    },
    {
      id: 2,
      task: "Ler um capitulo de um livro",
      category: "Pessoal",
      completed: false,
    },
    {
      id: 3,
      task: "Preparar relatório mensal",
      category: "Trabalho",
      completed: false,
    },
    {
      id: 4,
      task: "Completar projeto de programação",
      category: "Coding",
      completed: false,
    },
    {
      id: 5,
      task: "Fazer um check-up médico",
      category: "Saúde",
      completed: false,
    },
    {
      id: 6,
      task: "Fazer exercícios físicos",
      category: "Fitness",
      completed: false,
    },
    {
      id: 7,
      task: "Assistir a uma aula online",
      category: "Estudos",
      completed: false,
    },
    {
      id: 8,
      task: "Pagar contas do mês",
      category: "Financeiro",
      completed: false,
    },
    {
      id: 9,
      task: "Comprar presente de aniversário",
      category: "Compras",
      completed: false,
    },
    {
      id: 10,
      task: "Organizar fotos do celular",
      category: "Pessoal",
      completed: false,
    },
    {
      id: 11,
      task: "Reunião com a equipe",
      category: "Trabalho",
      completed: false,
    },
    {
      id: 12,
      task: "Revisar código de um projeto",
      category: "Coding",
      completed: false,
    },
    {
      id: 13,
      task: "Fazer exames de sangue",
      category: "Saúde",
      completed: false,
    },
    {
      id: 14,
      task: "Fazer yoga",
      category: "Fitness",
      completed: false,
    },
    {
      id: 15,
      task: "Assistir a um documentário",
      category: "Estudos",
      completed: false,
    },
    {
      id: 16,
      task: "Revisar despesas do mês",
      category: "Financeiro",
      completed: false,
    },
    // Additional tasks for each category
    {
      id: 17,
      task: "Comprar roupas novas",
      category: "Compras",
      completed: false,
    },
    {
      id: 18,
      task: "Meditar por 10 minutos",
      category: "Pessoal",
      completed: false,
    },
    {
      id: 19,
      task: "Preparar apresentação para reunião",
      category: "Trabalho",
      completed: false,
    },
    {
      id: 20,
      task: "Debugar um código",
      category: "Coding",
      completed: false,
    },
    {
      id: 21,
      task: "Fazer check-up dentário",
      category: "Saúde",
      completed: false,
    },
    {
      id: 22,
      task: "Fazer caminhada",
      category: "Fitness",
      completed: false,
    },
    {
      id: 23,
      task: "Assistir a uma aula de matemática",
      category: "Estudos",
      completed: false,
    },
    {
      id: 24,
      task: "Ler um artigo científico",
      category: "Estudos",
      completed: false,
    },
    {
      id: 25,
      task: "Fazer planejamento financeiro",
      category: "Financeiro",
      completed: false,
    },
];

let defaultTasks = JSON.parse(JSON.stringify(tasks)); // botao pra resetar as tarefas

let selectedCategory = categories[0];

const purgeTasks = () => {
  const raw = localStorage.getItem("tasks");
  if (!raw) return;

  let savedTasks = JSON.parse(raw);

  const cleanedTasks = savedTasks.filter((task) => {
      const nomeValido = task.task && task.task.trim() !== "" && task.task.trim().toLowerCase() !== "nova tarefa";
      const categoriaValida = categories.some(cat => cat.title.toLowerCase() === task.category?.toLowerCase());
      return nomeValido && categoriaValida;
  });

  localStorage.setItem("tasks", JSON.stringify(cleanedTasks));
  console.log(`🧼 Purificação completa. ${savedTasks.length - cleanedTasks.length} tarefa(s) deletada(s).`);
};
purgeTasks();

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
    const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    totalCategoryTasks.innerHTML = `${categoryTasks.length} Tarefas`;
    totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        // obter todas as tarefas da categoria atual
        const categoryTasks = tasks.filter(
            (task) => task.category.toLowerCase() === category.title.toLowerCase()
        );

        // crie uma div para renderizar a categoria
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click", () => {
            wrapper.classList.add("show-category");
            selectedCategory = category;
            
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `/src/images/${category.img}`;
            calculateTotal();
            
            renderTasks();
        });

        div.innerHTML = `
            <div class="left">
                                <img src="/src/images/${category.img}"alt="${category.title}">
                                <div class="content">
                                    <h1>${category.title}</h1>
                                    <p>${categoryTasks.length} Tarefas</p>
                                </div>
                            </div>
                            <div class="options">
                                <div class="toggle-btn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                            />
                                    </svg>
                                </div>
                            </div>
        `;

        categoriesContainer.appendChild(div);
    });
};

const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );

    if (categoryTasks.length === 0) {
        tasksContainer.innerHTML = `<p class="no-task">Nenhuma tarefa para essa categoria</p>`;
    } else {
        categoryTasks.forEach((task) => {
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label = document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks[index].completed = !tasks[index].completed;
                
                saveLocal();
                // Não é necessário renderizar todas as tarefas novamente após marcar uma como concluída
            });

            div.innerHTML = `
                <div class="delete">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </div>`;
             
            label.innerHTML = `<span class="checkmark">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
            </span>
            <p>${task.task}</p>`;

            label.prepend(checkbox);   
            div.prepend(label);
            tasksContainer.appendChild(div); 
            
            // deletar tarefa
            const deleteBtn = div.querySelector(".delete");
            deleteBtn.addEventListener("click", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks.splice(index, 1);
                saveLocal();
                renderTasks();
                calculateTotal();
                renderCategories(); // Atualiza as categorias após deletar uma tarefa
            });
        });
    }
    
    // Removido daqui para evitar loop infinito
    // renderCategories();
    // calculateTotal();
};


//resetar tarefas para o estado inicial
/*
const resetBtn = document.querySelector(".reset-btn");
const resetTasksToDefault = () => {
    tasks = JSON.parse(JSON.stringify(defaultTasks)); 
    saveLocal();
    renderTasks();
    calculateTotal();
    renderCategories();
    console.log("🔄 Tarefas resetadas para o estado inicial.");
};

document.querySelector(".reset-btn").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja resetar todas as tarefas?")) {
      resetTasksToDefault(); 
  }
});
*/

const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));

    if (localTasks) {
        tasks = localTasks;
    }
};


const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
      alert("Insira uma tarefa");
  } else {
      const newTask = {
          id: Date.now(),
          task,
          category,
          completed: false,
      };

      tasks.push(newTask);
      saveLocal();
      toggleAddTaskForm();
      taskInput.value = "";

      // Trocar pra categoria da tarefa criada
      const matchedCategory = categories.find(cat => cat.title.toLowerCase() === category.toLowerCase());
      if (matchedCategory) {
          selectedCategory = matchedCategory;
          categoryTitle.innerHTML = matchedCategory.title;
          categoryImg.src = `/src/images/${matchedCategory.img}`;
          wrapper.classList.add("show-category"); // <- isso aqui faz a mágica da troca de tela
          calculateTotal();
          renderTasks();
      }

      renderCategories(); // Atualiza contadores e número de tarefas
  }
});


// Limpa as opções existentes e adiciona as categorias
const populateCategorySelect = () => {
    categorySelect.innerHTML = "";
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.title.toLowerCase();
        option.textContent = category.title;
        categorySelect.appendChild(option);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getLocal();
    purgeTasks();
    populateCategorySelect(); // Preenche o select de categorias
    calculateTotal();
    renderCategories();
    renderTasks();
});