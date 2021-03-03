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