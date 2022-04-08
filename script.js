let currentState = {
    0: false,
    1: false,
    2: false
}

let catMenuState = {
    noneOpen: true,
    someOpen: false,
    allOpen: false
}

let storage = [

    {name: "lemon", price: 2.30, catList: ["food", "fruits"] },
    {name: "apple", price: 1.20, catList: ["food", "fruits"] },
    {name: "banana", price: 1.50, catList: ["food", "fruits"] },
    {name: "tomato", price: 1.60, catList: ["food", "vegetables"] },
    {name: "potato", price: 0.90, catList: ["food", "vegetables"] },
    {name: "buckweat", price: 1.90, catList: ["food", "grains"] },
    {name: "rice", price: 1.40, catList: ["food", "grains" ] },
    {name: "lighter", price: 0.30, catList: ["useful things"] },
    {name: "paper bag", price: 0.10, catList: ["useful things", "bags"] },
    {name: "plastic bag", price: 0.20, catList: ["useful things", "bags"] },
    {name: "coffee", price: 1, catList: ["drinks"] },
    {name: "tea", price: 1, catList: ["drinks"] },
    {name: "water", price: 0.80, catList: ["drinks"] },
    {name: "beer", price: 1.05, catList: ["drinks", "alcohol"] },
    {name: "vine", price: 3, catList: ["drinks", "alcohol"] },
    {name: "salt", price: 0.40, catList: ["spices", "food"] },
    {name: "sugar", price: 0.40, catList: ["spices", "food"] },
    {name: "bread", price: 0.50, catList: ["food"] },
    {name: "vodka", price: 3, catList: ["alcohol", "drinks"] }

];

const filterByCat = (arr) => {

    const catSet = new Set();
    
    arr.forEach(element => {
        for(val of element.catList){
            catSet.add(val);
        }
    });

    let categories = "";
    for(val of catSet){
        categories = categories.concat(String(val) + " ");
    }

    let selectedCat = prompt("select category: " + categories);
    return arr.filter(x => x.catList.includes(selectedCat));
}

const showCats = (arr) => {

    const catSet = new Set();
    arr.forEach(element => {
        for(val of element.catList){
            catSet.add(val);
        }
    });

    let catsList = [];
    for(cat of catSet){

        let Obj = new Object();
        Obj['category'] = cat;
        Obj['goods'] = arr.filter( x => x.catList.includes(cat)).sort((a, b) => a.name > b.name ? 1: -1);

        catsList.push(Obj);

        catsList.sort((a, b) => a.category > b.category ? 1: -1);
    }

    return catsList;
}

const init = () => {

    showAll(0);

    currentState[0] = true;

    checkButtons();
}

//num in showAll is quick fix for 2 states: 0 --- when nothing was changed, 1 --- when item was added and we have to re-write the container
const showAll = (num) => {
    
    if(num === 0){
        if(currentState[0]){
            return;
        }
    }

    setCurrentState(0);
    document.getElementById("storage-items-amount").innerHTML = "curent amount of original items: " + storage.length;
    
    for(items in storage){

        let newLi = createShownElem(items);
        document.getElementById("items-list").innerHTML += newLi.outerHTML;

    }

    document.getElementById("items-list").innerHTML += createAddItemButton().outerHTML;
    document.getElementById("items-list").innerHTML += createEditItemButton().outerHTML;
    document.getElementById("cats").addEventListener("click", clickCatHandler);
}

const createAddItemButton = () => {
    let newBut = document.createElement("button");
    newBut.innerText = "Add item";
    newBut.classList.add("add-item-but");
    document.getElementById("items-list").innerHTML += newBut.outerHTML;
    newBut.setAttribute("onclick", "addItemToStorage()");

    return newBut;
}

const addItemToStorage = () => {
    createModalWindowAdd();
}

const createModalWindowAdd = () => {
    let modal = document.createElement("div");
    modal.classList.add("modal-window-adding-item");

    let modalBack = document.createElement("div");
    modalBack.classList.add("modal-back");

    modal.innerHTML = `
        <ul class = "input-panel">
            <h1>Adding new item: </h1>
            <li class = "input-field-set">
                <span class = "input-field-title">Name (ID): </span>
                <input type = text class = "modal-input" id = "modal-input-name">
            </li>
            <li class = "input-field-set">
                <span class = "input-field-title">Price: </span>
                <input type = number class = "modal-input" id = "modal-input-price">
            </li>
            <li class = "input-field-set">
                <span class = "input-field-title">Category: </span>
                <input type = text class = "modal-input category-input" id = "modal-input-cat0">
            </li>
            <li class = "input-field-set">
                <span class = "input-field-title">Category 2 (optional): </span>
                <input type = text class = "modal-input category-input" id = "modal-input-cat1">
            </li>
            <li class = "input-field-set">
                <span class = "input-field-title">Category 3 (optional): </span>
                <input type = text class = "modal-input category-input" id = "modal-input-cat2">
            </li>

            <div class = "modal-buttons-set">
                <button class = "modal-button" id = "add-item-button">
                    Add
                </button>
                <button class = "modal-button" id = "cancel-button">
                    Cancel
                </button>
            </div>
        </ul>
        
    `

    document.querySelector("body").prepend(modal);
    document.querySelector("body").prepend(modalBack);

    document.querySelector(".modal-buttons-set").addEventListener("click", modalButtonClick);
}

const modalButtonClick = (e) => {
    if(e.target.id === "add-item-button"){

        let values = [];
        let inputValues = document.getElementsByClassName("category-input");

        for(let i = 0; i < inputValues.length; i++){
            if(inputValues[i].value !== ""){
                values.push(inputValues[i].value);
            }
        }

        if(document.getElementById("modal-input-name").value === "" || values.length === 0 
            || document.getElementById("modal-input-price").value === ""){
            alert("you have to input nesessery fields");
            return;
        }
        

        let newItem = {
            name: document.getElementById("modal-input-name").value,
            price: Number(document.getElementById("modal-input-price").value),
            catList: values.length > 1 ? [...values] : values
        };

        storage.push(newItem);

        alert("new item added!");

        document.querySelector(".modal-back").remove();
        document.querySelector(".modal-window-adding-item").remove();

        document.getElementById("items-list").innerHTML = "";
        
        showAll(1);

    }

    if(e.target.id === "cancel-button" && e.target.parentElement.parentElement.classList.contains("input-panel")){
        document.querySelector(".modal-back").remove();
        document.querySelector(".modal-window-adding-item").remove();
    }

    if(e.target.id === "cancel-button" && e.target.parentElement.parentElement.classList.contains("modal-window-editing-item")){
        document.querySelector(".modal-back").remove();
        document.querySelector(".modal-window-editing-item").remove();
    }

    if(e.target.classList.contains("list") || e.target.parentElement.classList.contains("list")){
        e.target.classList.contains("list") ? console.log("editing " + e.target.id) : console.log("editing " + e.target.parentElement.id);
    }
}

const createEditItemButton = () => {
    let newBut = document.createElement("button");
    newBut.innerText = "Edit item";
    newBut.classList.add("edit-item-but");
    document.getElementById("items-list").innerHTML += newBut.outerHTML;
    newBut.setAttribute("onclick", "editItemInStorage()");

    return newBut;
}

const editItemInStorage = () => {
    createModalWindowEdit();
}

const createModalWindowEdit = () => {
    let modal = document.createElement("div");
    modal.classList.add("modal-window-editing-item");

    let modalBack = document.createElement("div");
    modalBack.classList.add("modal-back");

    modal.innerHTML += `
    <h1 class = "edit-modal-header">Select item to edit it</h1>
    `

    for(item in storage){
        modal.innerHTML += createShownElem(item, storage[item].name).outerHTML;
    }

    modal.innerHTML += `
    <div class = "modal-buttons-set">
        <button class = "modal-button" id = "cancel-button">
            Cancel
        </button>
    </div>
    `

    document.querySelector("body").prepend(modal);
    document.querySelector("body").prepend(modalBack);

    document.querySelector(".modal-window-editing-item").addEventListener("click", modalButtonClick);
}

const createShownElem = (items, data) => {


    let newLi = document.createElement("li");

    if(!!data){
        newLi.id = data;
    }

    let newLi_name = document.createElement("span");
    newLi_name.innerHTML += +items+1 + ". " + storage[items].name;
    newLi_name.classList.add("names");
    newLi.innerHTML += newLi_name.outerHTML;

    let newLi_price = document.createElement("span");
    newLi_price.innerHTML += "price: " + storage[items].price + "$";
    newLi_price.classList.add("prices");
    newLi.innerHTML += newLi_price.outerHTML;

    let newLi_cats = document.createElement("span");
    newLi_cats.innerHTML += "categories: " + storage[items].catList;
    newLi_cats.classList.add("categories");
    newLi.innerHTML += newLi_cats.outerHTML;

    newLi.classList.add("list");
    return newLi;
}

const clickCatHandler = (e) => {
    if(e.target.classList.contains("cats-header") || e.target.id === "general-list-arrow"){
        allCatsCheck();
        return;
    }
    if(e.target.classList.contains("category-header") || e.target.classList.contains("arrow-header")){
        catClick(e.target.getAttribute("category-num"));
    }
}


const checkButtons = () => {
    let bucttons = document.getElementsByClassName("actionBUtton");
    for(state in currentState){
        if(currentState[state] === true){
            bucttons[state].classList.add("active-button");
        }
        else{
            bucttons[state].classList.remove("active-button");
        }
    }
}

const allCatsCheck = () => {
    let cats = document.getElementsByClassName("category-list");
    let shouldHideAll = null;
    let shoulOpenAll = null;

    for(let i = 0, shownCount = 0; i < cats.length; i++){
        if(cats[i].getAttribute("shown") === "true"){
            shownCount++;
        }
        if(i === cats.length-1){
            shouldHideAll = shownCount === cats.length ? true : false;
            if(shownCount === 0){
                shoulOpenAll = true;
            }
        } 
    }

    if(shoulOpenAll){
        for(ca of cats){
            catClick(ca.getAttribute("category-num"));
        }
        return;
    }

    if(shouldHideAll){
        for(ca of cats){
            catClick(ca.getAttribute("category-num"));
        }
        return;
    }

    for(ca of cats){
        if(ca.getAttribute("shown") === "false"){
            catClick(ca.getAttribute("category-num"));
        }
    }
}

const catClick = (data) => {
    let currentList = document.getElementsByClassName("category-list")[data];
    let img = document.getElementById(data + " category-header-arrow");

    if(currentList.getAttribute("shown") == "false"){
        currentList.setAttribute("shown", true);
        currentList.classList.add("selected-cat-shown");
        currentList.classList.remove("selected-cat-hidden");
        img.classList.add("arrow-header-rotate");
        setMenuState();
    }

    else{
        currentList.setAttribute("shown", false);
        currentList.classList.remove("selected-cat-shown");
        currentList.classList.add("selected-cat-hidden");
        img.classList.remove("arrow-header-rotate");
        setMenuState();
    }
}

const setMenuState = () => {

    let img = document.getElementById("general-list-arrow");

    let allShown = null;
    let someShown = null;
    let allHidden = null;

    let allCategoriesList = document.getElementsByClassName("category-list");
    
    for(let i = 0, shownCount = 0; i < allCategoriesList.length; i++){
        
        if(allCategoriesList[i].getAttribute("shown") === "true"){
            shownCount++;
        }
        if(i === allCategoriesList.length-1){
            if(shownCount === allCategoriesList.length-1){
                allShown = true;
                catMenuState.allOpen = true;
                catMenuState.noneOpen = false;
                catMenuState.someOpen = false;
                img.classList.add("arrow-header-rotate");
                return;
            }
            if(shownCount > 0 && shownCount < allCategoriesList.length-1){
                someShown = true;
                catMenuState.allOpen = false;
                catMenuState.someOpen = true;
                catMenuState.noneOpen = false;
                img.classList.add("arrow-header-rotate");
                return;
            }
            if(shownCount === 0){
                allHidden = true;
                catMenuState.allOpen = false;
                catMenuState.someOpen = false;
                catMenuState.noneOpen = true;
                img.classList.remove("arrow-header-rotate");
                return;
            }
        }
        
    }
}

const writeCats = () => {
    if(currentState[1]){
        return;
    }

    setCurrentState(1);

    if( document.getElementById("cats").innerHTML !== ""){
        checkButtons();
        return;
    }


    let searchPanel = document.createElement("section");
    searchPanel.id = "search-panel";
    searchPanel.innerHTML +=
        `<h1 class = "search-header" id = "search-header">Search item:</h1>
        <input type = "text" id = "search-field" class = "search-field">
        <ul id = "search-result" class = "search-result"></ul>
    `;

    document.getElementById("cats").innerHTML += searchPanel.outerHTML;

    let generalHeader = document.createElement("h1");
    generalHeader.classList.add("cats-header");
    generalHeader.innerHTML += "Categories: ";
    generalHeader.innerHTML += createElementArrow("general-list-arrow").outerHTML;

    document.getElementById("cats").innerHTML += generalHeader.outerHTML;

    let cats = showCats(storage);

    for(let i = 0; i < cats.length; i++){
        let newUl = document.createElement("ul");
        newUl.classList.add("category-list");
        newUl.id = "category-list " + i;
        newUl.setAttribute("shown", false);
        newUl.setAttribute('category-num', i);

        let newUl_header = document.createElement("h1");
        newUl_header.innerHTML = +i+1 + ") " + cats[i].category;
        newUl_header.classList.add("category-header");
        newUl_header.setAttribute("category-num", i);
        newUl_header.id = +i + " " + cats[i].category + " header";
        newUl_header.innerHTML += createElementArrow(i + " " + "category-header-arrow", i).outerHTML;

        newUl.innerHTML += newUl_header.outerHTML;

        for(good of cats[i].goods){
            let newLi = document.createElement('li');
            newLi.innerHTML += good.name + " " + good.price + "$";
            newUl.innerHTML += newLi.outerHTML;
        }

        newUl.classList.add("selected-cat-hidden");

        document.getElementById("cats").innerHTML += newUl.outerHTML;
    }

    checkButtons();
    document.getElementById("search-field").addEventListener('input', searchInputHandler);
}

const searchInputHandler = (e) => {
    let arr = [];
    for(item in storage){
        if(storage[item].name.includes(e.target.value) && e.target.value !== ""){
            arr.push(storage[item]);
        }
    }

    updateSearchResult(arr);
} 

const updateSearchResult = (arr) => {
    document.getElementById("search-result").innerHTML = "";

    for(item in arr){
        document.getElementById("search-result").innerHTML +=
        +item+1 + ") " + "<strong>" + arr[item].name + "</strong> (" + arr[item].catList + ")<br>";
    }
}

const write1cat = () => {
    if(currentState[2]){
        return;
    }

    setCurrentState(2);

    if( document.getElementById("cat").innerHTML !== ""){
        checkButtons();
        return;
    }

    let menu = document.createElement('select');
    menu.setAttribute("name", "categories");
    menu.setAttribute("id", "cat-select");
    menu.style.fontSize = "1.2em";
    
    let cats = showCats(storage);

    for(let i = 0; i < cats.length; i++){
        let menuOption = document.createElement("option");
        menuOption.innerHTML += cats[i].category;
        menuOption.setAttribute("value", cats[i].category)

        menu.innerHTML += menuOption.outerHTML;
    }

    document.getElementById("cat").innerHTML += menu.outerHTML;

    let applyButton = document.createElement("button");
    applyButton.innerHTML += "Apply";
    applyButton.classList.add("apply-button");
    applyButton.setAttribute("onclick", "applyCatClick()");

    document.getElementById("cat").innerHTML += applyButton.outerHTML;
}

const applyCatClick = () => {

    let index = document.getElementById("cat-select").selectedIndex;
    
    let items = storage.filter(x => x.catList.includes(showCats(storage)[index].category))
    items.sort((a, b) => a.name > b.name ? 1 : -1);
    
    let list = document.createElement("ul");
    list.id = "cat-list";

    for(val in items){
        let newLi = document.createElement("li");
        newLi.innerHTML += +val+1 + ") " + items[val].name + " " +items[val].price + "$ " + "categories: " + items[val].catList;
        list.innerHTML += newLi.outerHTML;
    }

    if(document.getElementById("cat-list") === null){
        document.getElementById("cat").innerHTML += list.outerHTML;
    }
    else{
        document.getElementById("cat-list").innerHTML = list.outerHTML;
    }

    document.getElementById("cat-select").selectedIndex = index;

}

const createElementArrow = (id, catNum) => {
    let arrowElem = document.createElement("img");
    arrowElem.classList.add("arrow-header");
    arrowElem.setAttribute("src", "res/arrow.png");
    arrowElem.id = id;
    arrowElem.setAttribute("category-num", catNum);

    return arrowElem;
}

const setCurrentState = (num) => {
    switch(num){
        case 0:
            currentState[0] = true;
            currentState[1] = false;
            currentState[2] = false;
            document.getElementById("items-list").style.display = "block";
            document.getElementById("cats").style.display = "none";
            document.getElementById("cat").style.display = "none";

            document.getElementById("cats").innerHTML = "";
            document.getElementById("cat").innerHTML = "";

            break;
        case 1:
            currentState[0] = false;
            currentState[1] = true;
            currentState[2] = false;
            document.getElementById("items-list").style.display = "none";
            document.getElementById("cats").style.display = "block";
            document.getElementById("cat").style.display = "none";

            document.getElementById("cat").innerHTML = "";
            document.getElementById("items-list").innerHTML = "";

            break;
        case 2:
            currentState[0] = false;
            currentState[1] = false;
            currentState[2] = true;
            document.getElementById("items-list").style.display = "none";
            document.getElementById("cats").style.display = "none";
            document.getElementById("cat").style.display = "block";

            document.getElementById("items-list").innerHTML = "";
            document.getElementById("cats").innerHTML = "";

            break;
        default: return;
    }

    checkButtons();
}

init();