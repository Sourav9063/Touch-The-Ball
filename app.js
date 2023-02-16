// const b2 = document.querySelector('#v2');
// const h1 = document.querySelector('h1');
// let mouseX;
// let mouseY;
const container = document.querySelector('.container');
let firstTouch = false;
let time = 0;
const playTime = 30;
let timer;

const pixel = document.querySelector('.pixel');
let your_high_score = document.querySelector('.your_high_score');

your_high_score.innerText = localStorage.getItem('high_score') || 0;



let touchCount = 0;

const count = document.createElement('h1');
count.innerText = touchCount;
count.style.color = 'rgba(255,255,255,0.75)';
pixel.classList.add('centerChildren');

pixel.append(count);

const timeView = document.createElement('h1');
timeView.innerText = time;
timeView.style.fontSize = '7em';
timeView.style.color = 'rgba(255,255,255,0.35)';
timeView.classList.add('not-selectable');
count.classList.add('not-selectable');

pixel.onmouseover = () => {
    // console.log('ara ara');
    // console.log(container.width);
    if (!firstTouch) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        container.append(timeView);
        time = playTime;
        timer = setInterval(() => {
            time--;
            // console.log(time--);
            timeView.innerText = time;

            if (time <= 0) {
                // setInterval.stop();
                reset();
            }
        }, 1000);
        firstTouch = true;
    }


    touchCount++;
    count.innerText = touchCount;

    pixel.style.top = `${(clamp(Math.random() * container.offsetHeight, 0, container.offsetHeight - 80)).toString()}px`;
    pixel.style.left = `${(clamp(Math.random() * container.offsetWidth, 0, container.offsetWidth - 80)).toString()}px`;
    // pixel.style.top = `${(Math.random() * 2000).toString()}px`;
    // pixel.style.left = `${(Math.random() * 2000).toString()}px`;
    // pixel.style.top = '0px';
    // pixel.style.left = '0px';
    pixel.style.backgroundColor = `rgb(${(Math.random() * 255)}, ${(Math.random() * 255)}, ${(Math.random() * 255)})`;


};

// document.onmousemove = (event) => {
//     // console.log(event.pageX);
//     // console.log(`y=${event.pageY}`);
//     mouseX = event.pageX;
//     mouseY = event.pageY;
// };


const reset = () => {

    your_high_score.innerText = Math.max(touchCount, localStorage.getItem('high_score') || 0);
    localStorage.setItem('high_score', your_high_score.innerText);
    timeView.innerText = 'Your score: ' + touchCount;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    count.innerText = 0;
    touchCount = 0;
    time = playTime;
    firstTouch = false;
    clearInterval(timer);

};

const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);

};


// uid
function uidGen(length = 16) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


// console.log(uidGen())
let myUid = localStorage.getItem("myUid");
console.log({ myUid })
if (myUid === null) {
    localStorage.setItem("myUid", uidGen())
    myUid = localStorage.getItem("myUid")
    console.log(myUid)
}


// json storage
//https://extendsclass.com/json-storage.html#apiDocumentation
// 617fe2f7-ade6-11ed-a58d-0242ac110002

const baseUrl = "https://json.extendsclass.com/bin/cfb382b3a92d";

// const score = {
//     score: 0,
//     myUid: "",
//     name: "",
// }

// const json = { top3: [score, score, score] };

// console.log(JSON.stringify(json));


fetch(baseUrl, {
}).then(res => {
    console.log(res)
    return res.json()
})
    .then(res => console.dir(res))

