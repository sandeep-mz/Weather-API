const finalShow =document.querySelector(".weather-body");

let btn = document.querySelector("button");

document.querySelector("#data-container").style.display ="none";


btn.addEventListener("click",remove);

function remove(){

   document.querySelector(".container").style.display = "none";
   
   document.querySelector("#data-container").style.display ="block";

   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);    
  }else{
    alert("Your location is not available to us and we cannot show data Weather Data")
  }

  function showPosition(positions){
    var lat = positions.coords.latitude;
    var long = positions.coords.longitude;

 //let map = document.getElementById("map");
 //map.setAttribute(src,`https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp&output=embed`);

    console.log(lat,long)
    arrangeApi(lat,long);
  }

 
}

function arrangeApi(latitude, longitude){
    const apiKey="333f1a5584dd90007e6ccde9ea30bc4e";
    const api="https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=apiKey";
    const firstHalfApi ="https://api.openweathermap.org/data/2.5/weather?lat=";
    const secondHalfApi ="&lon=";
    const thirdHalfApi ="&appid=";
    const fullApi =firstHalfApi+latitude+ secondHalfApi+longitude+thirdHalfApi+apiKey;
   // console.log(fullApi);
  retData(fullApi);
}

async function retData(fullApi){
    const apiUrlData = await fetch(fullApi);
    const DataApi = await apiUrlData.json();
    //console.log(DataApi);

    showData(DataApi);
}
function showData(Dataweather){
  console.log(Dataweather);
  const {main,wind,coord, dt, timezone, weather} = Dataweather;
  const{sys} = Dataweather;
  console.log(main.feels_like);
  console.log(main.humidity);
  console.log(main.pressure);
  console.log(coord.lat);
  console.log(coord.lon);
  console.log(timezone);
  console.log(wind.deg);
  console.log(wind.speed);
  console.log(weather.length);
  console.log(Dataweather.name);

  finalShow.innerHTML =`
  <div><p>Weather Api</p></div>
  <p class="comment">Here is your current Location</p>
  <div class ="input-field">
      <div class="labell">Lat: ${coord.lat}</div>
      <div class="labell">Long: ${coord.lon}</div>
  </div>
  <div id="map1">
        <iframe 
        id="map" 
        src="https://maps.google.com/maps?q=${coord.lat},${coord.lon}&hl=en&z=14&amp&output=embed" 
        frameborder="0" 
        
        height="400" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
  <div id="result">
    <div><p style="margin-bottom:20px;">Weather Data</p></div>
      
      <div class="data">
          <div class="label" id="location">
              Location: ${Dataweather.name}
          </div>
          <div class="label" id="time-zone">
              TimeZone: ${timezone}
          </div>
          <div class="label" id="windSpeed">
              Wind Speed: ${wind.speed}
          </div>
          <div class="label" id="pressure">  
             Pressure: ${main.pressure}
          </div>
          <div  class="label" id="humidity">
             Humidity: ${main.humidity}
          </div>
          <div class="label" id="WinDirection">
            Wind Direction: ${wind.deg}
          </div>
          <div class="label" id="UV">
              UV Index: ${weather.length}
          </div> 
          <div  class="label" id="feels"> 
              Feels Like: ${main.feels_like}
          </div>
          
      </div>
  </div> `;                
}