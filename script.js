// ----------- EVENTOS ----------------
//uso do async - ou seja, executará uma função que não é ordenada
document.querySelector('.busca').addEventListener('submit', async (event) =>{
    event.preventDefault() //previne o comportamento padrão que o form tem que ter

    let input = document.querySelector('#searchInput').value
    if (input !== ''){
        clearInfo()
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=72194e44a7e80d2656aa222a6308b31f`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                description: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg    
            })
        } else {
            clearInfo()
            showWarning('Não encontramos a localidade!')
        }
    } else {
        clearInfo()
    }
})


// ----------- FUNÇÃO ----------------
//função para mostrar as informações
function showInfo(json){
    showWarning('')
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    
    document.querySelector('.temp img').setAttribute('src', 
        `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    
    document.querySelector('.tempDescription').innerHTML = `${json.description}`

    //Pegando cada elemento atraves do objeto
    document.querySelector('.resultado').style.display = 'block'
}

//função limpar a tela
function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

//função de mensagem na tela
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

