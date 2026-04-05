const input=document.querySelector('.input');
const btn=document.querySelector('.btn');
const img=document.querySelector('.img');
const deg=document.querySelector('.deg');
const text=document.querySelector('.text');
const txt=document.querySelector('.h1');

async function searchweather(city){
    const api_key="ec83a2aef626858a831e5139ac5a8c01";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data=await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);
    if(weather_data.cod==404){
        txt.innerHTML=`<p>Not Found!</p>`;
        img.src="./assets/404.png";
        input.value="";
        text.innerHTML="";
        deg.innerHTML="";
        return;
    }
    deg.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    text.innerHTML=`${weather_data.weather[0].description}`;
    txt.innerHTML=`${input.value}`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            img.src="./assets/cloud.png";
            break;
        case 'Clear':
            img.src="./assets/clear.png";
            break;
        case 'Rain':
            img.src="./assets/rain.png";
            break;
        case 'Mist':
            img.src="./assets/mist.png";
            break;
        case 'Snow':
            img.src="./assets/snow.png";
            break;
        default:
            img.src="./assets/cloud.png";
    }
    input.value="";
};
function handleSearch(){
    if(input.value.trim()===""){
        txt.innerHTML = `<p>Enter city name</p>`;
        img.src="./assets/404.png";
        deg.innerHTML=`0°C`;
        input.value="";
        return;
    }
    searchweather(input.value);
}
btn.addEventListener('click', handleSearch);
input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        handleSearch();
    }
});