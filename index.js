let searchBtn   = document.querySelector('#searchBtn');
let search      = document.querySelector('#search');


searchBtn.addEventListener('click', () => {
    let searchValue = search.value;
    if(searchValue !== ""){
        fetch(`https://api.github.com/search/repositories?q=${searchValue}`)
            .then(res => res.json())
            .then(data => setReposField(JSON.stringify(data)))
    } else {
        console.log('else')
    }
    search.value = "";
});

function setReposField(res){
    let reposField = document.getElementById('repoField');
    let out = '';
    let reposObj = JSON.parse(res);
    let repos = reposObj.items.splice(0, 10)
    console.log(repos)
    repos.map( item => {
        out += `<p>Наименование: ${item.name}</p>`

    });

    reposField.innerHTML = out;
}
