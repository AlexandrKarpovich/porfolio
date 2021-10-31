window.addEventListener("DOMContentLoaded",	() => {

    const themeButton = document.querySelector('.theme-btn'),
        themeType = document.querySelector('.theme-type');

    themeButton.addEventListener('click', () => {

        //Apply theme
        if (document.body.classList.contains('light-theme')) {

            //Remove light theme
            document.body.classList.remove('light-theme');

            //Add dark theme
            document.body.classList.add('dark-theme');

            //Set button text
            themeType.textContent = 'Light';

        } else {

            //Remove dark theme
            document.body.classList.remove('dark-theme');

            //Add light theme
            document.body.classList.add('light-theme');

            //Set button text
            themeType.textContent = 'Dark';

        }
    })
});
