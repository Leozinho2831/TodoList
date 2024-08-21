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