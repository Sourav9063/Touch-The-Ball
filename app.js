// const b2 = document.querySelector('#v2');
// const h1 = document.querySelector('h1');
// let mouseX;
// let mouseY;

let dataTmp = [];


const baseUrl = "https://json.extendsclass.com/bin/cfb382b3a92d";
let isLoading = true;

const highScoreOl = document.querySelector(".high-score-ol");




const container = document.querySelector('.container');
let firstTouch = false;
let time = 0;
const playTime = 10;
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

const updateData = (score, name, myUid) => {

    const dataMine = {
        score: score,
        name: name,
        myUid: myUid
    }
    fetch(baseUrl, {
        cache: 'no-cache',
    }).then(res => {


        return res.json();
    }).then(data => {
        dataTmp = data.top3;

        dataTmp.push(dataMine);
        dataTmp = dataTmp.sort((a, b) => {
            return (b.score - a.score)
        })
        dataTmp.length > 11 && (dataTmp.length = 10);

        console.log(dataTmp)
        const finalData = {
            top3: dataTmp
        }

        console.log(finalData)


        fetch(baseUrl, {
            method: "PUT",
            cache: "no-cache",

            body: JSON.stringify(finalData)

        }).then(res => res.json()).then(data => {
            if (data.status) {
                alert("Some problem occured")
            }
            else {
                getdata(baseUrl);
            }
        })

            .catch(err => {
                alert("Something went wrong")
            })




    })
    // .catch(e => {
    //     console.dir(e)
    // })


}




const updateServer = (touchCount) => {

    if (dataTmp.length === 0) {
        alert("Server Error")
    }
    else if (dataTmp[dataTmp.length - 1].score < touchCount) {
        getdata(baseUrl)
        let name = prompt("Please enter your name:", "Name");
        if (name == null || name == "") {
            alert("Your score will not be published")
        } else {

            updateData(touchCount, name, myUid);



        }

    }
    else {

    }

}

const reset = () => {

    your_high_score.innerText = Math.max(touchCount, localStorage.getItem('high_score') || 0);
    localStorage.setItem('high_score', your_high_score.innerText);
    timeView.innerText = 'Your score: ' + touchCount;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateServer(touchCount);



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

// const score = {
//     score: 0,
//     myUid: "",
//     name: "",
// }

// const json = { top3: [score, score, score] };

// console.log(JSON.stringify(json));


const appendHighScore = (data) => {

    highScoreOl.innerHTML = '';


    data.forEach(element => {

        const li = document.createElement("li");
        const innerDiv1 = document.createElement("span")
        const innerDiv2 = document.createElement("span")
        innerDiv1.innerHTML = element.score;
        innerDiv2.innerHTML = element.myUid === myUid ? "&nbsp; By   Your hold the score" : "&nbsp; By " + ((element.name === "" || element.name == null) ? element.myUid : element.name);

        li.appendChild(innerDiv2);
        li.appendChild(innerDiv1);
        highScoreOl.appendChild(li);




    });


}


const getdata = (baseUrl) => {

    isLoading = true;

    fetch(baseUrl, {
        cache: 'no-cache',
    }).then(res => {


        return res.json();
    }).then(data => {
        dataTmp = data.top3;

        dataTmp = dataTmp.sort((a, b) => {
            return (b.score - a.score)
        })

        console.dir(dataTmp);
        dataTmp.length > 11 && (dataTmp.length = 10);

        console.log(dataTmp.length)

        appendHighScore(dataTmp);

        isLoading = false;

        console.log(data)
    })
        .catch(e => {
            console.dir(e)
        })

    // return dataTmp;
}


getdata(baseUrl);


// const data = {
//     score: score,
//     name: name,
//     myUid: myUid
// }

// dataTmp.push(data);
// dataTmp = dataTmp.sort((a, b) => {
//     return (b.score - a.score)
// })
// dataTmp.length > 11 && (dataTmp.length = 10);

// console.log(dataTmp.length)
// const finalData = {
//     top3: dataTmp
// }


// fetch(baseUrl, {
//     method: "PUT",
//     cache: "no-cache",

//     body: JSON.stringify(finalData)

// }).then(res => res.json()).then(data => {
//     if (data.status) {
//         alert("Some problem occured")
//     }
//     else {
//         getdata(baseUrl);
//     }
// })

//     .catch(err => {
//         alert("Something went wrong")
//     })