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

function initCreatedTask(){
    const deleteIcon = document.querySelectorAll('.js-task svg:last-of-type');
    const completeIcon = document.querySelectorAll('.js-task svg:first-of-type');
    const titleDay = document.querySelector('.js-title');

    if(completeIcon.length && deleteIcon.length){
        function completeTask(){
            const classComplete = 'completeTask';
            this.parentElement.classList.toggle(classComplete);
        }

        completeIcon.forEach((complete) => {
            complete.addEventListener('click', completeTask);
        });

        function deleteTask(){
            this.parentElement.remove();
            const taskNumber = document.querySelectorAll('.js-task');

            if(taskNumber.length === 0){
                titleDay.remove();
            }
        }

        deleteIcon.forEach((icon) => {
            icon.addEventListener('click', deleteTask);
        });
    }

    const buttonCreateTask = document.querySelector('.js-addTask');

    if(buttonCreateTask){
        function createTask(){
            const inputText = document.querySelector('.js-inputText');
            const inputDate = document.querySelector('.js-inputDate');
            const inputHour = document.querySelector('.js-inputHour');
    
            if(inputText.value){

                if(inputDate.value || inputHour.value){
                    const [year, month, day] = inputDate.value.split('-');
                    const dateBr = `${day}/${month}/${year}`;
    
                    if(titleDay.textContent === dateBr){
                        console.log('title igual');
                    }
                }

            } else {

                alert('Necessário completar pelo menos o evento');
                
            }
        }
    
        buttonCreateTask.addEventListener('click', createTask);
    }
}

initCreatedTask();