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