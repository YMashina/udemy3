/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против всех"
    ]
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

const createMovieListItem = (movieName) => {
    let item = document.createElement('li');
    item.classList.add('promo__interactive-item');
    item.style.display = 'list-item';

    if (movieName.length > 21) {
        movieName = (movieName[21] === ' ') ? movieName.slice(0,22) + '...' : movieName.slice(0,22) + ' ...';
    }

    item.innerHTML = `${movieName}
        <div class="delete"></div>`
    return item;
};

const favoriteMovieCheckbox = document.getElementById('favoriteMovieCheckbox');
favoriteMovieCheckbox.addEventListener("click", () => {
    console.log('checkbox!');
});



const renewMoviesList = () => {
    watchedMoviesList.innerHTML = "";
    movieDB.movies.sort();
    movieDB.movies.forEach((movie) => {
        watchedMoviesList.append(createMovieListItem(movie));
    });
};

renewMoviesList();

const submitMoviesToListButton = document.getElementById("confirmAddMovieToList");
submitMoviesToListButton.setAttribute('type', 'button');

submitMoviesToListButton.addEventListener("click", () => {
    let movie = document.getElementById("movieInput").value;
    movieDB.movies.push(movie);
    console.log(movieDB.movies);

    if (favoriteMovieCheckbox.checked){
        console.log('checkbox is checked');
    } else {
        console.log('checkbox is not checked');
    }
    favoriteMovieCheckbox.checked = false;
    document.getElementById("movieInput").value = '';
    renewMoviesList();
});

let deleteMovieFromList = watchedMoviesList.getElementsByClassName('delete');
for (let deleteMovieFromListElement of deleteMovieFromList) {
    deleteMovieFromListElement.addEventListener("click", () => {
        let listItemToDelete = deleteMovieFromListElement.parentNode;
        listItemToDelete.parentNode.removeChild(listItemToDelete);
    });

}