let searchBtn = document.querySelector('#searchBtn');
let search = document.querySelector('#search');

search.addEventListener('keypress', (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) { // Клавиша Enter
        console.log('enter');
        getRepos();
    }
});

searchBtn.addEventListener('click', getRepos);

function getRepos() {
    event.preventDefault();
    let searchValue = search.value;
    cancelError(search)
    if (searchValue.length < 5) {
        checkLength(search);
    } else {
        if (searchValue !== "") {
            fetch(`https://api.github.com/search/repositories?q=${searchValue}`)
                .then(res => res.json())
                .then(data => {
                    if (data.total_count === 0) {
                        emptyField()
                    } else {
                        setReposField(JSON.stringify(data))
                    }
                })
        } else {
            console.log('else')
            emptySearch()
        }
        search.value = "";
    }
}


function setReposField(res) {
    let reposField = document.getElementById('repoField');
    let out = '';
    let reposObj = JSON.parse(res);
    let repos = reposObj.items.splice(0, 10)
    console.log(repos)
    repos.map(item => {

        out += `<div class="result-field">
                        <p><a href="${item.html_url}" target="_blank">Наименование: ${item.name}</a></p>
                        <p><a href="${item.owner.html_url}" target="_blank">Автор: ${item.owner.login}</a></p>
                        <p>Описание: ${item.description}</p>
                        <p>Язык: ${item.language}</p>
                </div>`
    });

    reposField.innerHTML = out;
}

function emptyField() {
    let emptyField = document.getElementById('repoField');
    emptyField.innerHTML = `<p>ничего не найдено</p>`;
}

function emptySearch() {
    let emptySearch = document.getElementById('repoField');
    emptySearch.innerHTML = `<p>а вы ничего и не ввели!</p>`;
}


function showError(input, message) {
    const formControl = input.parentElement;
    console.log(formControl)
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function checkLength(input) {
    showError(input, `Введите минимум 5 символов`);
}

function cancelError(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control small';
    const small = formControl.querySelector('small');
    small.innerText = '';
}
