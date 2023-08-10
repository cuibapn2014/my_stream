const video = document.querySelector('#video');
const camera = document.querySelector('#camera');
const btnRecord = document.querySelector('.btn_record');
const btnRecordScreen = document.querySelector('.btn_record_display');
const btnStop = document.querySelector('.btn_stop');
const timeEle = document.querySelector('.timer')
let isRecording = false;
let [s, m, h] = [0, 0, 0];
var timerCount;

btnRecord.addEventListener('click', async (e) => {
    e.preventDefault();
  
    if(!isRecording) timerCount = setInterval(feature, 1000);

    isRecording = true;

    let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    btnRecord.classList.add('active');
    btnRecord.textContent = 'Đang mở camera';
    camera.srcObject = stream;

    
});

btnStop.addEventListener('click', async (e) => {
    e.preventDefault();

    isRecording = false;

    const tracks = video.srcObject;
    const tracksCamera = camera.srcObject;

    if(tracks)
        tracks.getTracks().forEach(track => track.stop());

    if(tracksCamera)
        tracksCamera.getTracks().forEach(track => track.stop());

    camera.srcObject = null;
    video.srcObject = null;

    btnRecord.classList.remove('active');
    btnRecordScreen.classList.remove('active');
    btnRecord.textContent = 'Camera';
    btnRecordScreen.textContent = 'Stream';
    clearTime();
});

// Record screen
btnRecordScreen.addEventListener('click', async (e) => {
    e.preventDefault();

    if(!isRecording) timerCount = setInterval(feature, 1000);

    isRecording = true;

    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
    });
    btnRecordScreen.classList.add('active');
    btnRecordScreen.textContent = 'Đang stream';
    video.srcObject = stream;
});

function plusTime() {
    if(s < 60) s++;
    else {
        s = 0;
        m++
    }

    if(m >= 60) {
        m = 0;
        h++
    }
}

function showTime() {
    let seconds = s < 10 ? `0${s}` : s;
    let minutes = m < 10 ? `0${m}` : m;
    let hours = h < 10 ? `0${h}` : h;
    timeEle.textContent = `${hours}:${minutes}:${seconds}`;
}

function feature(){
    plusTime()
    showTime()
}

const clearTime = () => {
    clearInterval(timerCount);
    s = 0;
    m = 0;
    h = 0;
    showTime()
}



