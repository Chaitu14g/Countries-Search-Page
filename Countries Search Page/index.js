let spinner = document.getElementById("spinner");

let searchInput = document.getElementById("searchInput");

let resultCountries = document.getElementById("resultCountries");

let searchValueLower=""

let countriesList=[]

function single_result(i) {
    let {
        name,
        flag,
        population
    } = i;

    let country_card = document.createElement("div");
    country_card.id = name;
    country_card.classList.add("country-card", "d-flex", "flex-row", "col-10", "col-md-5", "ml-5");

    let country_flag = document.createElement("img");
    country_flag.src = flag;
    country_flag.classList.add("country-flag");
    country_card.appendChild(country_flag);

    let text_container = document.createElement("div");
    text_container.classList.add("d-flex", "flex-column", "ml-3");
    country_card.appendChild(text_container);

    let country_name = document.createElement("h1");
    country_name.textContent = name;
    country_name.classList.add("country-name");
    text_container.appendChild(country_name);

    let country_population = document.createElement("p");
    country_population.textContent = population;
    country_population.classList.add("country-population");
    text_container.appendChild(country_population);

    spinner.classList.add("d-none");
    resultCountries.appendChild(country_card);
}

function finalOutput(){
    resultCountries.textContent=""
    for (let i of countriesList){
        let countryNameLower=i.name.toLowerCase()
        if (countryNameLower.includes(searchValueLower)){
            single_result(i)
        }
    }
}

function getCountries(){
    let options = {
        method: "GET"
    }
    spinner.classList.remove("d-none");
    fetch("https://apis.ccbp.in/countries-data", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            let a = response;
            countriesList=a
            finalOutput()
            console.log(a)
        })
}

function searchValueFunction(event) {
    let enteredValue=event.target.value;
    searchValueLower=enteredValue.toLowerCase()
    finalOutput()
}

getCountries()
searchInput.addEventListener("keyup", searchValueFunction)
