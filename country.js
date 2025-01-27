const countryName = new URLSearchParams(window.location.search).get('country')
const countryContainer = document.querySelector('.country-info-container')
const themeSwitcher = document.querySelector('.theme-switcher')

const countryFlag = document.querySelector('.country-img img');
const nameElem = document.querySelector('.counrty-name');
const nativeNameElem = document.getElementById('native-name');
const populationElem = document.getElementById('population');
const regionElem = document.getElementById('region');
const subRegionElem = document.getElementById('sub-region');
const capitalElem = document.getElementById('capital');
const tldElem = document.getElementById('top-level-domain');
const currenciesElem = document.getElementById('currencies');
const languagesElem = document.getElementById('languages');

const borderCountriesElem = document.querySelector('.border-countries');

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
.then((res) => res.json())
.then((data) =>{
    const flagUrl = data[0].flags.svg
    const name = data[0].name.common;
    const nativeName = data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common || data[0].name.common ;
    const population = data[0].population.toLocaleString('en-In');
    const region= data[0].region || '';
    const subRegion = data[0].subregion || '';
    const capital = data[0].capital.join(', ') || '';
    const tld = data[0].tld.join(', ') || ''
    const languages = Object.values(data[0].languages).join(', ') || ''
    const currencies = Object.values(data[0].currencies).map((elem) => elem.name).join(', ') || ''
    const borderCountries  = data[0].borders || '';
  
nameElem.innerText  = name
countryFlag.src = flagUrl;
countryFlag.alt = `${countryName} flag`; // Add an accessible alt text
name.innerText = countryName;
nativeNameElem.innerText = nativeName;
populationElem.innerText = population;
regionElem.innerText = region;
subRegionElem.innerText = subRegion;
capitalElem.innerText = capital;
tldElem.innerText = tld;
currenciesElem.innerText = currencies;
languagesElem.innerText = languages;
 
    console.log(capital);
    console.log(data);
    if(borderCountries){
        // console.log(borderCountries);
        borderCountries.forEach((elem)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${elem}`)
            .then((res) => res.json())
            .then(([countrydata]) =>{
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = countrydata.name.common
                borderCountryTag.href = `./country.html?country=${countrydata.name.common}`
                borderCountriesElem.append(borderCountryTag)
                
                
            })
        })
    }
//     console.log(clutter);
//    countryContainer.innerHTML = `<div class="country-img">
//                 <img src="${flag}" alt="">
//             </div>
//             <div class="country-text-info">
//                 <h1 class="title">${name}</h1>
//                <div class="country-up">
               
//                     <p><b>Native Name: </b>${nativeName}</p>
//                     <p><b>population: </b>${population}</p>
//                     <p><b>Region: </b>${region}</p>
//                     <p><b>Sub Region: </b>${subregion}</p>
//                     <p><b>Capital: </b>${capital}</p>
//                     <p><b>Top Level Domain: </b>${tld}</p>
//                     <p><b>Currencies: </b>${currencies}</p>
//                     <p><b>Languages: </b>${languages}</p>
//                </div>
//                <div class="border-countries-cont">
//                     <p class="border-countries"><b>Border Countries: </b> &nbsp;
//                     ${clutter}
//                     </p>
//                 </div>
//             </div>`
      
 
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