function initOpenMenu(){
    const menu = document.querySelector('.js-menu');
    const linksMenu = document.querySelector('.js-links');

    if(menu && linksMenu){
        function openMenu(){
            const classMenu = 'menuActive';
            linksMenu.classList.toggle(classMenu);
        }

        menu.addEventListener('click', openMenu);
    }
}

initOpenMenu();

// se mexer para, eu avisei
function saveTasks(){
    const taskSection = document.querySelector('.js-taskSection');

    if(taskSection) localStorage.setItem('tasks', taskSection.innerHTML);
}

function loadTasks(){
    const savedTasks = localStorage.getItem('tasks');

    if(savedTasks){
        const taskSection = document.querySelector('.js-taskSection');

        if(taskSection){
            taskSection.innerHTML = savedTasks;

            initCompleteTask();
            initRemoveTask();
        }
    }
}

loadTasks();

function initCreateTask(){
    const inputText = document.querySelector('.js-inputText');
    const inputDate = document.querySelector('.js-inputDate');
    const inputHour = document.querySelector('.js-inputHour');
    const inputCheckbox = document.querySelector('.js-inputCheckbox');

    const containerSection = document.querySelector('.js-taskSection');
    const buttonCreateTask = document.querySelector('.js-buttonAdd');

    function createTask(){
        if(inputText && inputDate && containerSection){
            if(inputText.value && inputDate.value){
                const [year, month, day] = inputDate.value.split('-');
                const dateBr = `${day}/${month}/${year}`;
    
                const containerTasks = document.querySelectorAll('.js-containerTasks');
                const titlesDay = document.querySelectorAll('.js-title');
    
                let titleExists = false;
                let valueTitleDay = -1;
    
                titlesDay.forEach((titleDay, index) => {
                    if (titleDay.textContent === dateBr) {
                        titleExists = true;
                        valueTitleDay = index;
                    }
                });
    
                let hour = '';
                if (inputHour.value){
                    const [day, month, year] = dateBr.split('/');
                    const [hourInput, minuteInput] = inputHour.value.split(':');

                    const eventDate = new Date(year, month - 1, day, hourInput, minuteInput);
                    const date = new Date();
                    const differenceDate = eventDate.getTime() - date.getTime();
                    
                    if(inputCheckbox.checked){

                        if(differenceDate < 0){
                            hour = '<p class="task-text js-textHour">acabou</p>';
                        } else {
                            const totalMinutes = Math.floor(differenceDate / (1000 * 60));
                            const days = Math.floor(totalMinutes / (60 * 24));
                            const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
                            const minutes = totalMinutes % 60;
                                    
                            let formattedHour = '';

                            if (days > 0){
                                const formattedDay = String(days).padStart(2, '0');
                                const formattedHourPart = String(hours).padStart(2, '0');
                                formattedHour = `${formattedDay}:${formattedHourPart}:${String(minutes).padStart(2, '0')}`;
                            } else {
                                const formattedHourPart = String(hours).padStart(2, '0');
                                const formattedMinute = String(minutes).padStart(2, '0');
                                formattedHour = `${formattedHourPart}:${formattedMinute}`;
                            }
                                    
                            hour = `<p class="task-text js-textHour js-hourTimer">${formattedHour}</p>`;
                        }

                    } else if(differenceDate < 0){
                        hour = '<p class="task-text js-textHour">acabou</p>';
                    } else {
                        hour = `<p class="task-text js-textHour">${inputHour.value}</p>`;
                    }

                } 
    
                let newTask = '';
                if(titleExists){
                    newTask = `
                        <li class="task js-task">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED">
                                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
                            </svg>
                            <div class="task__text-container">
                                <p class="task-text">${inputText.value}</p>
                                ${hour}
                            </div>
                            <svg class="js-removeTask" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                        </li>
                    `;
    
                    containerTasks[valueTitleDay].children[1].innerHTML += newTask;
    
                } else if(inputText.value){
                    newTask = `
                        <div class="js-containerTasks">
                            <h2 class="sub-title js-title">${dateBr}</h2>
                            <ul class="list__task limit-width js-listTask">
                                <li class="task js-task">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED">
                                        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
                                    </svg>
                                    <div class="task__text-container">
                                        <p class="task-text">${inputText.value}</p>
                                        ${hour}
                                    </div>
                                    <svg class="js-removeTask" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EDEDED">
                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    `;
    
                    containerSection.innerHTML += newTask;
                }
    
                // organizando tasks por data
                const tasksContainers = document.querySelectorAll('.js-containerTasks');
                let tasksArray = Array.from(tasksContainers);

                if(tasksArray.length){
                    if(tasksArray.length > 1){
                        tasksArray.sort((a, b) => {
                            const dateA = new Date(a.querySelector('.js-title').textContent.split('/').reverse().join('-'));
                            const dateB = new Date(b.querySelector('.js-title').textContent.split('/').reverse().join('-'));
            
                            return dateA - dateB;
                        });
            
                        tasksArray.forEach(task => {
                            containerSection.appendChild(task);
                        });
                    }
                }
    
                // organizando tasks por horas
                const tasksList = document.querySelectorAll('.js-listTask');
    
                if(tasksList.length){
                    if(inputHour.value){
                        tasksList.forEach((taskList) => {
        
                            tasksArray = Array.from(taskList.children);
            
                            tasksArray.sort((a, b) => {
                                const hourAElement = a.querySelector('.js-textHour');
                                const hourBElement = b.querySelector('.js-textHour');
                                
                                const hourA = hourAElement ? hourAElement.textContent : '24:00';
                                const hourB = hourBElement ? hourBElement.textContent : '24:00';
            
                                return hourA.localeCompare(hourB);
                            });
            
                            tasksArray.forEach((task) => {
                                taskList.appendChild(task);
                            });
                            
                        });
                    }
                }
    
                inputText.value = '';
                inputDate.value = '';
                if(inputHour.value) inputHour.value = '';
                if(inputCheckbox.checked) inputCheckbox.checked = false;
    
                localStorage.removeItem('tasks');
                saveTasks();
    
                initCompleteTask();
                initRemoveTask();

            } else {
                alert('Preencher pelo menos a tarefa e a data.');
            }
        }
    }

    if(buttonCreateTask) buttonCreateTask.addEventListener('click', createTask);
    
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            createTask();
        }
    });
}

initCreateTask();

function updateHour(){
    const hourTexts = document.querySelectorAll('.js-hourTimer');

    if(hourTexts.length){
        hourTexts.forEach((hourText) => {
            let textParts = hourText.innerHTML.split(':');
            let day = 0, hour = 0, minutes = 0;

            if (textParts.length === 3) {

                day = Number(textParts[0]);
                hour = Number(textParts[1]);
                minutes = Number(textParts[2]);

            } else if (textParts.length === 2){

                hour = Number(textParts[0]);
                minutes = Number(textParts[1]);

            } else if (textParts.length === 1){

                minutes = Number(textParts[0]);
            
            }

            minutes -= 1;

            if (minutes < 0){
                minutes = 59;
                hour -= 1;

                if (hour < 0){
                    hour = 23;
                    day -= 1;

                    if (day < 0){
                        day = 0;
                    }
                }

            } else if(minutes === 0 && hour === 0 && (day === 0 || day === undefined)){
                minutes = 0, hour = 0, day = 0;
            }

            if(day == 0 && hour == 0 && minutes == 0){

                hourText.innerHTML = 'acabou';
                hourText.classList.remove('js-hourTimer');

            } else {

                const newTime = [
                    day !== undefined ? day.toString().padStart(2, '0') : '',
                    hour.toString().padStart(2, '0'),
                    minutes.toString().padStart(2, '0')
                ];

                if(newTime[0] !== '00' && newTime[0] !== undefined){
                    hourText.innerHTML = `${newTime[0]}:${newTime[1]}:${newTime[2]}`;
                } else {
                    hourText.innerHTML = `${newTime[1]}:${newTime[2]}`;
                }
            }

        });
    }

    localStorage.removeItem('tasks');
    saveTasks();    
}

setInterval(updateHour, 60000);

function initCompleteTask() {
    const iconComplete = document.querySelectorAll('.js-task svg:first-of-type');

    function finishTask() {
        const classComplete = 'completeTask';
        const elementChecked = this.parentElement;

        if(elementChecked){
            elementChecked.classList.toggle(classComplete);

            elementChecked.parentElement.appendChild(elementChecked);
            saveTasks();
        }
    }

    if(iconComplete.length){
        iconComplete.forEach((complete) => {
            complete.addEventListener('click', finishTask);
        });
    }
}

initCompleteTask();

function initRemoveTask() {
    const iconRemover = document.querySelectorAll('.js-removeTask');

    function deleteTask(){

        const elementRemove = this.parentElement;
        
        if(elementRemove.parentElement.children.length === 1){
            elementRemove.parentElement.parentElement.remove();
        }

        elementRemove.remove();

        saveTasks();
    }

    if(iconRemover){
        iconRemover.forEach((remover) => {
            remover.addEventListener('click', deleteTask);
        });
    }
}

initRemoveTask();

function initStorage(){
    function saveTasks(){
        const taskSection = document.querySelector('.js-taskSection');
        if(taskSection) localStorage.setItem('tasks', taskSection.innerHTML);
    }

    function loadTasks(){
        const savedTasks = localStorage.getItem('tasks');

        if(savedTasks){
            const taskSection = document.querySelector('.js-taskSection');

            if(taskSection){
                taskSection.innerHTML = savedTasks;

                initCompleteTask();
                initRemoveTask();
            }
        }
    }

    loadTasks();
}

initStorage();