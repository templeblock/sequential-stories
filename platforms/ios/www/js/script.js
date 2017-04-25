/*
NN Plots

cvalenzuela
*/

document.addEventListener("deviceready", onDeviceReady, false);

var imageURL;

// on device ready
function onDeviceReady() {
}

// Get data AJAX
$('#data').click(function() {
  $.ajax({
    url: 'http://172.16.223.189:8080/',
    type: 'GET',
    cache: false,
    error: function() {
      $('#info').html('<p>An error has occurred</p>')
    },
    success: function(data) {
      $('#info').html(data)
    }
  });
});

// Use camara
function useCamara() {
  navigator.camera.getPicture(cameraSuccess, cameraError, {
    quality: 50,
    allowEdit: true,
    destinationType: navigator.camera.DestinationType.FILE_URI
  });
};

// Use an existig photo
function getImage() {
  navigator.camera.getPicture(cameraSuccess, cameraError, {
    quality: 50,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
  });
}

// Display Image taken/selected
function cameraSuccess(imageData) {
  console.log("Got image")
  var photo = document.getElementById('photo');
  photo.src = imageData;
  imageURL = imageData;
}

// Upload image to server
function uploadPhoto() {
  var imageURI = imageURL
  var photo = document.getElementById('photo');
  photo.src = imageURI;

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";

  var params = new Object();
  params.value1 = "test";
  params.value2 = "param";

  options.params = params;
  options.chunkedMode = false;

  var ft = new FileTransfer();
  ft.upload(imageURI, "http://172.16.223.189:8080/upload", win, fail, options);
}

function win(r) {
  console.log("File Uploaded " + r.response);
  alert(r.response);
}

function fail(error) {
  alert("An error has occurred: Code = " = error.code);
}

function cameraError(){
  alert("error getting image")
}
