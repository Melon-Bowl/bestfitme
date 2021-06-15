let video;
let accessToken;
let trueId;
let psy;

// MODAL CODE //
let modal = document.getElementById("cameraBooth");
let btn = document.getElementById("openCameraBooth");
let span = document.getElementsByClassName("close")[0];
let topText = document.getElementById("top-text");
let bottomText = document.getElementById("bottom-text");


btn.onclick = function() {
  modal.style.display = "block";
  showVideo = true;
  initialiseVideo();
  takeScreenshot();
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// MODAL CODE OVER //

// CAMERA CODE //
const initialiseVideo = () => {
  video = document.querySelector("#camera");
  
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err) {
        console.log("Something went wrong!");
        console.log(err)
      });
  }
}


const takeScreenshot = () => {
  const screenshotButton = document.querySelector("#take-picture");
  const img = document.querySelector("#user-img");
  
  const canvas = document.createElement("canvas");
  
  screenshotButton.onclick = video.onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    img.src = canvas.toDataURL("image/jpg");
    topText.style.display = "block";
    bottomText.style.display = "block";
  };
  
  function handleSuccess(stream) {
    screenshotButton.disabled = false;
    video.srcObject = stream;
  }
}
// CAMERA CODE OVER //

// API COMMUNICTION CODE //
const connectToApi = () => {
  const url = 'https://api.bestfitme.com/v5/account/auth';
  const login = {
    "account_name": "Nikita_Egor",
    "password": "Kenobi1q2w"
  }

  const optParam = {
    headers: {
      "content-type": "application/json",
      "host": "api.bestfitme.com"
    },
    body: JSON.stringify(login),
    method: "POST"
  }

  fetch(url, optParam)
  .then(response => response.json())
  .then(data => {
    console.log("Success!", data);
    accessToken = data.access_token;
  })
  .catch(err => console.log(err));
}

const analysePhoto = () => {
  connectToApi();
  const url = 'https://api.bestfitme.com/v5/photo'; 
  const formData = new FormData();
  const fileField = document.querySelector("#userImage");

  formData.append('', fileField.files[0]);
  console.log(accessToken);

  const optParam = {
    headers: {
      "content-type": "multipart/form-data",
      "host": "https://api.bestfitme.com",
      "authorization": accessToken
    },
    body: formData,
    mode: "cors",
    method: "POST"
  }

  fetch(url, optParam, {
    credentials: 'include'
  })
  .then(response => response.json())
  .then(data => console.log("Success!", data))
  .catch(err => console.log(err));
}

// API COMMUNICATION CODE OVER //