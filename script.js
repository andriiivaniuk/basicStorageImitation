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

    currentState[0] = true;

    for(items in storage){

        let newLi = document.createElement("li");

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

        document.getElementById("items-list").innerHTML += newLi.outerHTML;
    }

    document.getElementById("cats").addEventListener("click", clickCatHandler);
    document.getElementById("storage-items-amount").innerHTML += storage.length;
    checkButtons();
}

const clickCatHandler = (e) => {
    if(e.target.classList.contains("cats-header") || e.target.id === "general-list-arrow"){
        allCatsCheck();
        return;
    }
    if(e.target.classList.contains("category-header") || e.target.classList.contains("arrow-header")){
        catClick(e.target.id[0]);
    }
}


const showAllItems = () => {
    if(currentState[0]){
        return;
    }
    else{
        setCurrentState(0);
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
            catClick(ca.id[ca.id.length-1]);
        }
        return;
    }

    if(shouldHideAll){
        for(ca of cats){
            catClick(ca.id[ca.id.length-1]);
        }
        return;
    }

    for(ca of cats){
        if(ca.getAttribute("shown") === "false"){
            catClick(ca.id[ca.id.length-1]);
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

        let newUl_header = document.createElement("h1");
        newUl_header.innerHTML = +i+1 + ") " + cats[i].category;
        newUl_header.classList.add("category-header")
        newUl_header.id = +i + " " + cats[i].category + " header";
        newUl_header.innerHTML += createElementArrow(i + " " + "category-header-arrow").outerHTML;

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

const createElementArrow = (id) => {
    let arrowElem = document.createElement("img");
    arrowElem.classList.add("arrow-header");
    arrowElem.setAttribute("src", "res/arrow.png");
    arrowElem.id = id;

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
            break;
        case 1:
            currentState[0] = false;
            currentState[1] = true;
            currentState[2] = false;
            document.getElementById("items-list").style.display = "none";
            document.getElementById("cats").style.display = "block";
            document.getElementById("cat").style.display = "none";
            break;
        case 2:
            currentState[0] = false;
            currentState[1] = false;
            currentState[2] = true;
            document.getElementById("items-list").style.display = "none";
            document.getElementById("cats").style.display = "none";
            document.getElementById("cat").style.display = "block";
            break;
        default: return;
    }

    checkButtons();
}

init();