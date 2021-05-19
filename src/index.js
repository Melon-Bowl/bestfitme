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
  //connectToApi();
  const url = 'https://api.bestfitme.com/v5/photo'; 
  const formData = new FormData();
  const fileField = document.querySelector("#userImage");

  formData.append('', fileField.files[0]);
  console.log(formData);
  console.log(fileField.files[0]);

  const optParam = {
    headers: {
      "Content-Type": "multipart/form-data",
      "host": "https://api.bestfitme.com",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTmlraXRhX0Vnb3IiLCJ0bi9hY2NvdW50L2lkIjoiZjQ1ZmVlODY1MDk2NDBjZGJiZGRmOTgyY2I3NDM3MGUiLCJuYmYiOjE2MjE0Mjg1MTUsImV4cCI6MTYyMTUxNDkxNSwiaXNzIjoiVHJ1ZU5vcnRoIn0.9BSePfN4uGk5MCuv7Iwi5DdLxO8i6Hqf5XbrXiWCHLU"
    },
    body: formData,
    mode: "no-cors",
    method: "POST"
  }

  fetch(url, optParam, {
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => console.log("Success!", data))
  .catch(err => console.log(err));
}

// API COMMUNICATION CODE OVER //