let film = [];
let selectedCategory = "Hepsi";
let editID = null;

window.onload = function(){
    const data = localStorage.getItem("film");
    if(data){
        film = JSON.parse(data);
    }

    document.getElementById("category").onchange = function(e){
        selectedCategory = e.target.value;
        renderFilm();
    }

    renderFilm();
}

function generateID(){
    return Date.now;
}

function addFilm(){
    const name = document.getElementById("nameInput");
    const type = document.getElementById("typeInput");
    const category = document.getElementById("categoryInput");

    name = nameInput.value;
    type = typeInput.value;
    category = categoryInput.value;

    if(name === " " || type === " ") return;

    if(editID){
        const item = film.find((f) => f.id === editID);

        item.name = name;
        item.type = type;
        item.category = category;

        editID = null;
    } else{
        const newItem ={
            id: generateID(),
            name: name,
            type: type,
            category: category,
            completed: false,
        }

        film.push(newItem);
    }

    localStorage.setItem("film", JSON.stringify(film));

    renderFilm();

    nameInput.value = "";
    typeInput.value = "";
    
}