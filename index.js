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
    let searchValue = search.value;
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


function setReposField(res) {
    let reposField = document.getElementById('repoField');
    let out = '';
    let reposObj = JSON.parse(res);
    let repos = reposObj.items.splice(0, 10)
    console.log(repos)
    repos.map(item => {
        out += `<p><a href="${item.html_url}" target="_blank">Наименование: ${item.name}</a></p>`
        out += `<p><a href="${item.owner.html_url}" target="_blank">Автор: ${item.owner.login}</a></p>`
        out += `<p>Описание: ${item.description}</p>`
        out += `<p>Язык: ${item.language}</p>`

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
