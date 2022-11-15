let tableContainer = document.getElementById('table');
let SearchLImitInputField = document.getElementById('search-limit-input');
let searchInputField = document.getElementById('search-input');
let tableBody = document.getElementById('table-body');
// searchInputField.addEventListener('onchange', (e) => {
//     searchInputValue = e.target.value;
// })
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd4a4c3b51fmshba644e3d51bfeebp187c7cjsn3d52e0a6b30e',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

//Getting data from api
function gettingApiData (cityName,cityLimit){
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${cityName}&limit=${cityLimit}`, options)
	.then(response => response.json())
	.then(response => displayData(response.data))
	.catch(err => console.error(err));

function displayData (city){
    console.log(city);
    tableBody.textContent = '';
    city.map( (city,i) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="table_row_data">${i+1}</td>
        <td class="table_row_data">${city.name}</td>
        <td class="table_row_data">${city.country}</td>
        <img class="country-img" src="${`https://countryflagsapi.com/png/${city.countryCode.toLowerCase()}`}" alt="${city.country}"></td>
        `
        tableBody.appendChild(tr);
    })
    toggleSpinner('none')
    
}

}

// Function to get input details
window.addEventListener('keydown', (e) => {
   let inputCity = searchInputField.value;
   let cityLimit = `${SearchLImitInputField.value || 5}`;
   SearchLImitInputField.value = cityLimit;

   if(e.key == 'Enter'){
    if (inputCity.length == 0){
        this.alert('Please provide valid place')
    }else if (!isNaN(cityLimit) ){
        if(cityLimit > 0 && cityLimit< 11) {
            toggleSpinner('block')
            gettingApiData(inputCity,cityLimit)
        }
        else {
            this.alert('Limit can be only between 1-10')
        }
    }

   }
})


// Function to toggle spinner
function toggleSpinner(displayStyle){
    document.getElementById('spinner').style.display = displayStyle;
}


