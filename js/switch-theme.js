window.addEventListener("DOMContentLoaded",	() => {

    const   lightTheme = 'light-theme',
            darkTheme = 'dark-theme';
    const   body = document.body;

    const   themeButton = document.querySelector('.theme-btn'),
            themeType = document.querySelector('.theme-type');

   if(localStorage.getItem('theme') === lightTheme) {
       body.classList.remove(`${darkTheme}`);
       body.classList.add(`${lightTheme}`);
   } else {
       body.classList.remove(`${lightTheme}`);
       body.classList.add(`${darkTheme}`);
   }

    themeButton.addEventListener('click', () => {

        //Apply theme
        if (body.classList.contains(`${lightTheme}`)) {

            //Remove light theme
            body.classList.remove(`${lightTheme}`);
            //Add dark theme
            body.classList.add(`${darkTheme}`);
            localStorage.setItem('theme', `${darkTheme}`);
            //Set button text
            themeType.textContent = 'Light';

        } else {
            //Remove dark theme
            body.classList.remove(`${darkTheme}`);
            //Add light theme
            body.classList.add(`${lightTheme}`);
            localStorage.setItem('theme', `${lightTheme}`);
            //Set button text
            themeType.textContent = 'Dark';

        }
    })
    // Todo: преключение темы записывать в localStorage
    // Todo: добавить переключение по рассвету и закату https://www.npmjs.com/package/sunrise-sunset-js
});
