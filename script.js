const counrtyContainer = document.querySelector(".country-container");
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeSwitcher = document.querySelector('.theme-switcher')
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) =>{
    renderCountries(data)
    allCountriesData = data
    console.log(allCountriesData);
  });

  filterByRegion.addEventListener('change' ,(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
  .then((res) => res.json())
  .then((data) =>{
    renderCountries(data)
  });
  })

  function renderCountries(countriesData){
    counrtyContainer.innerHTML = ''
    countriesData.forEach((elem, i) => {
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `./country.html?country=${countriesData[i].name.common}`;

      const cardHtml = ` <img src="${countriesData[i].flags.svg}" alt="${countriesData[i].name.common}">
                <div class="card-text">
                    <h3 class="card-title">${countriesData[i].name.common}</h3>
                    <p><b>Population: </b>${countriesData[i].population.toLocaleString('en-In')}</p>
                <p><b>Region: </b>${countriesData[i].region}</p>
                <p><b>Capital: </b>${countriesData[i].capital}</p>
                </div>`;
      countryCard.innerHTML = cardHtml;
      counrtyContainer.append(countryCard);
    });

  }

  searchInput.addEventListener('input' ,(e)=>{
    const filterCountries = allCountriesData.filter((dets)=> dets.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
      renderCountries(filterCountries)
  })



  if(localStorage.getItem('theme')){
    if(localStorage.getItem('theme') == 'dark'){
      document.body.classList.add('dark')
    } else{
      document.body.classList.remove('dark')
    }
  }
  themeSwitcher.addEventListener('click' , (elem)=>{
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')){
      themeSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
      localStorage.setItem('theme', 'dark')
    } else{
      themeSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`
      localStorage.setItem('theme', 'light')
    }
  })