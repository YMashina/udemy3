/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        {
            name: 'Логан',
            id: null,
        },
        {
            name: 'Лига справедливости',
            id: null,
        },
        {
            name: 'Ла-ла лэнд',
            id: null,
        },
        {
            name: 'Одержимость',
            id: null
        },
        {
            name: 'Скотт Пилигрим против всех',
            id: null,
        },
    ]
};

const addEventListenerToDeleteDiv = (deleteDivId) => {
    const deleteMovieDiv = document.getElementById(deleteDivId);
    deleteMovieDiv.addEventListener("click", () => {
        movieDB.movies.forEach((movie, index) => {
            if (movie.id === deleteMovieDiv.id) {
                movieDB.movies.splice(index,1);
            }
        });
        let listItemToDelete = deleteMovieDiv.parentNode;
        listItemToDelete.parentNode.removeChild(listItemToDelete);
    });
};

let advertisementsToDelete = document.getElementsByClassName('promo__adv')[0];
advertisementsToDelete.parentNode.removeChild(advertisementsToDelete);

document.getElementsByClassName('promo__bg')[0].style.backgroundImage = "url('img/bg.jpg')";

let watchedMoviesList = document.getElementById('listOfMoviesWatched');
watchedMoviesList.style.listStylePosition = 'inside';
watchedMoviesList.style.listStyleType = 'decimal';
let watchedMoviesListItems = watchedMoviesList.getElementsByClassName('promo__interactive-item');
for (let item of watchedMoviesListItems){
    item.style.display = 'list-item';
}

const createMovieListItem = (movie) => {
    let item = document.createElement('li');
    item.classList.add('promo__interactive-item');
    item.style.display = 'list-item';
    let movieNameShortened = movie.name;
    if (movieNameShortened.length > 21) {
        movieNameShortened = (movieNameShortened[21] === ' ') ? movieNameShortened.slice(0,22) + '...' : movieNameShortened.slice(0,22) + ' ...';
    }
    if (movie.id === null){
        movie.id = Math.random().toString(10).slice(2,6);
    }
    item.innerHTML = `${movieNameShortened}<div id="${movie.id}" class="delete"></div>`
    return item;
};

const movieComparator = (movieA, movieB) => {
    return movieA.name - movieB.name;
};

const renewMoviesList = () => {
    watchedMoviesList.innerHTML = "";
    movieDB.movies.sort(movieComparator);
    movieDB.movies.forEach((movie) => {
        watchedMoviesList.append(createMovieListItem(movie));
        addEventListenerToDeleteDiv(movie.id);
    });
};

renewMoviesList();

const favoriteMovieCheckbox = document.getElementById('favoriteMovieCheckbox');

const submitMoviesToListButton = document.getElementById("confirmAddMovieToList");
submitMoviesToListButton.setAttribute('type', 'button');

submitMoviesToListButton.addEventListener("click", () => {
    let movie = document.getElementById("movieInput").value;
    movieDB.movies.push({name : movie, id: null});

    if (favoriteMovieCheckbox.checked){
        console.log('checkbox was checked');
    } else {
        console.log('checkbox was not checked');
    }
    favoriteMovieCheckbox.checked = false;
    document.getElementById("movieInput").value = '';
    renewMoviesList();
});


