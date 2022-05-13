let search = document.querySelector('.search')
let arr = []
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let image = document.querySelector('.image')
let pH = document.querySelector('.pH')
let s1 = document.querySelector('.s1')
let s2 = document.querySelector('.s2')
let s3 = document.querySelector('.s3')
let s4 = document.querySelector('.s4')
let s5 = document.querySelector('.s5')
let s6 = document.querySelector('.s6')
let s7 = document.querySelector('.s7')
let s8 = document.querySelector('.s8')
let s9_1 = document.querySelector('.s9-1')
let s9_2 = document.querySelector('.s9-2')
let s9_3 = document.querySelector('.s9-3')
let pInfo = document.querySelector('.pInfo')
let i=0

span.onclick = function () {
    modal.style.display = "none";
}

document.querySelector('.btn').addEventListener('click', async () => {
    document.querySelector('.box2-1').innerHTML = ''
    let ser = search.value
    const response = await fetch(`http://www.omdbapi.com/?s=${ser}&apikey=87b4dd89`)
    const data = await response.json()
        .then(data => data.Search)
        .then(e => e.forEach(e => {
                document.querySelector('.box2-1')
                .insertAdjacentHTML('afterbegin',
                    `<div id='${i++}' class="box2">
        <img class="img" src="${e.Poster}" />
        <p class="p3">${e.Title}</p>
        <p class="p1">${e.Type}</p>
        <p class="p2">${e.Year}</p>
        <button class="btn2" onClick="getInfo(${++i})">Details</button>
        </div>`)
        
    }))
    .catch(err => alert('Поле для вводу пусте або не правильна назва фільму)'))
})

let arrN = []

async function getInfo(id){
    modal.style.display = "block";
    let iD = document.getElementById(`${id}` - 2)
    let arrData = iD.children
    image.src = arrData[0].src
    pH.textContent = arrData[1].textContent
    const response = await fetch(`http://www.omdbapi.com/?t=${pH.textContent}&apikey=87b4dd89`)
    const data = await response.json()
        .then(data => arrN.push(data))
        .catch(err => alert(err))
        console.log(arrN);
        s1.textContent = arrN[0].Rated;
        s2.textContent = arrN[0].Year;
        s3.textContent = arrN[0].Genre
        pInfo.textContent = arrN[0].Plot
        s4.textContent = arrN[0].Writer
        s5.textContent = arrN[0].Director
        s6.textContent = arrN[0].Actors
        s7.textContent = arrN[0].BoxOffice
        s8.textContent = arrN[0].Awards
        if(arrN[0].Ratings.length === 3){
            s9_1.textContent = arrN[0].Ratings[0].Source + " " + arrN[0].Ratings[0].Value;
            s9_2.textContent = arrN[0].Ratings[1].Source + " " + arrN[0].Ratings[1].Value;
            s9_3.textContent = arrN[0].Ratings[2].Source + " " + arrN[0].Ratings[2].Value
        } else if(arrN[0].Ratings.length === 2){
            s9_1.textContent = arrN[0].Ratings[0].Source + " " + arrN[0].Ratings[0].Value;
            s9_2.textContent = arrN[0].Ratings[1].Source + " " + arrN[0].Ratings[1].Value
        } else if (arrN[0].Ratings.length === 1){
            s9_1.textContent = arrN[0].Ratings[0].Source + " " + arrN[0].Ratings[0].Value;
        }
        arrN = []
}