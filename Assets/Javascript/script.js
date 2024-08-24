function initOpenMenu(){
    const menu = document.querySelector('.js-menu');
    const linksMenu = document.querySelector('.js-links');

    if(menu){
        function openMenu(){
            const classMenu = 'menuActive';
            linksMenu.classList.toggle(classMenu);
        }

        menu.addEventListener('click', openMenu);
    }
}

initOpenMenu();

function initCreateTask(){
    const inputText = document.querySelector('.js-inputText');
    const inputDate = document.querySelector('.js-inputDate');
    const inputHour = document.querySelector('.js-inputHour');

    const buttonCreateTask = document.querySelector('.js-buttonAdd');

    function createTask(){
        if(inputText.value){
            const [year, month, day] = inputDate.value.split('-');
            const dateBr = `${day}/${month}/${year}`;

            const containerTask = document.querySelector('.js-containerTasks');
            const titleDay = document.querySelector('.js-title');
            const listTask = document.querySelector('.js-listTask');

            let date = '';
            if(titleDay !== null){

                if(inputDate.value && dateBr !== titleDay.textContent){
                    date = `<h2 class="sub-title js-title">${dateBr}</h2>`;
                }

            } else if(titleDay === null) {

                if(inputDate.value){
                    date = `<h2 class="sub-title js-title">${dateBr}</h2>`;
                }

            }

            let hour = '';
            if(inputHour.value){
                hour = `<p class="task-text">${inputHour.value}</p>`
            }

            let newTask = '';
            if(listTask && dateBr === titleDay.textContent){
                newTask = `
                    <li class="task">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
                        <div class="task__text-container">
                            <p class="task-text">${inputText.value}</p>
                            ${hour}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </li>
                `;

                containerTask.children[1].innerHTML += newTask;

            } else {
                newTask = `
                    ${date}

                    <ul class="list__task js-listTask">
                        <li class="task">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
                            <div class="task__text-container">
                                <p class="task-text">${inputText.value}</p>
                                ${hour}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </li>
                    </ul>
                `;

                containerTask.innerHTML += newTask;
            }

        } else {
            alert('Preencher pelo menos a tarefa.');
        }
    }

    buttonCreateTask.addEventListener('click', createTask);
}

initCreateTask();