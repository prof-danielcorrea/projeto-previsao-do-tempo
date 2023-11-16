function buscarPrevisao() {
    const apiKey = "afb0e820f7d4d10897690a5a325cdb24";
    const cidade = document.getElementById("city-input").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const infoClima = document.getElementById("weather-info");
        infoClima.style.display = "flex";

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = `Temperatura: ${Math.round(data.main.temp)}°C`;
        document.getElementById("weather-description").innerText = `Condição: ${traduzirCondicao(data.weather[0].description)}`;
        document.getElementById("humidity").innerText = `Umidade: ${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `Velocidade do Vento: ${converteKmh(data.wind.speed)} km/h`;
      })
      .catch(erro => {
        console.error("Erro ao obter dados da API:", erro);
        alert("Cidade não encontrada. Por favor, verifique o nome da cidade.");
      });
  }

  function traduzirCondicao(descricao) {
    // Fiz a descrição da condição do tempo para português
    const traducoes = {
      "clear sky": "céu limpo",
      "few clouds": "poucas nuvens",
      "scattered clouds": "nuvens dispersas",
      "broken clouds": "nuvens quebradas",
      "overcast clouds": "nublado com nuvens",
      "light rain": "chuva leve",
      "moderate rain": "chuva moderada",
      "heavy rain": "chuva intensa",
      "light snow": "neve leve",
      "moderate snow": "neve moderada",
      "heavy snow": "neve intensa",
      "mist": "névoa",
      "thunderstorm with light rain": "trovoada com chuva leve",
      "thunderstorm with rain": "trovoada com chuva",
      "thunderstorm with heavy rain": "trovoada com chuva intensa",
      "thunderstorm with light snow": "trovoada com neve leve",
      "thunderstorm with snow": "trovoada com neve",
      "thunderstorm with heavy snow": "trovoada com neve intensa"
    };

    return traducoes[descricao] || descricao;
  }

  function converteKmh(velocidadeMetrosSegundo) {
    // Fiz a conversão da velocidade do vento de m/s para km/h
    return (velocidadeMetrosSegundo * 3.6).toFixed(2);
  }