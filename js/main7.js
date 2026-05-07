let film = [];
let selectedCategory = "Hepsi";
let editID = null;
let searchText = "";

window.onload = function () {
    const data = localStorage.getItem("film");
    if (data) {
        film = JSON.parse(data);
    }

    document.getElementById("category").onchange = function (e) {
        selectedCategory = e.target.value;
        renderFilm();
    }

    document.getElementById("searchInput").oninput = function(e){
        searchText = e.target.value.toLowerCase();
        renderFilm();
    }

    renderFilm();
}

function generateID() {
    return Date.now();
}

function addFilm() {
    const nameInput = document.getElementById("nameInput");
    const typeInput = document.getElementById("typeInput");
    const categoryInput = document.getElementById("category");

    const name = nameInput.value;
    const type = typeInput.value;
    const category = categoryInput.value;

    if (name === "" || type === "") return;

    if (editID) {
        const item = film.find((f) => f.id === editID);

        item.name = name;
        item.type = type;
        item.category = category;

        editID = null;
    } else {
        const newItem = {
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

function renderFilm() {
    const list = document.getElementById("filmList");
    list.innerHTML = "";

    let filteredFilm = film;

    if (selectedCategory !== "Hepsi") {
        filteredFilm = film.filter((item) => item.category === selectedCategory);
    }

    if(searchText !== " "){
        filteredFilm = filteredFilm.filter((item) => item.name.toLowerCase().includes(searchText));
    }

    const completedFilm = film.filter((item) => item.completed).length;
    const totalFilm = film.length;

    document.getElementById("filmText").textContent =
        completedFilm + " / " + totalFilm + " izlendi.";

    filteredFilm.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item.name + " " + item.type + " " + item.category;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        checkbox.onchange = function () {
            item.completed = !item.completed;
            localStorage.setItem("film", JSON.stringify(film));
            renderFilm();
        }

        const btn = document.createElement("button");
        btn.textContent = "Sil";

        btn.onclick = function () {
            film = film.filter((f) => f.id !== item.id);
            localStorage.setItem("film", JSON.stringify(film));
            renderFilm();
        }

        const btn2 = document.createElement("button");
        btn2.textContent = "Düzenle";

        btn2.onclick = function () {
            document.getElementById("nameInput").value = item.name;
            document.getElementById("typeInput").value = item.type;
            document.getElementById("category").value = item.category;

            editID = item.id;
        };

        li.appendChild(checkbox);
        li.appendChild(btn);
        li.appendChild(btn2);
        list.appendChild(li);
    });
}