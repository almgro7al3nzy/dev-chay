make our app in realtime.Now put socket codes into index.js above the http.listen(...):

io.on("connection", function (socket) {
  const socketId = socket.id;
  socketsStatus[socket.id] = {};


  console.log("connect");

  socket.on("voice", function (data) {

    var newData = data.split(";");
    newData[0] = "data:audio/ogg;";
    newData = newData[0] + newData[1];

    for (const id in socketsStatus) {

      if (id != socketId && !socketsStatus[id].mute && socketsStatus[id].online)
        socket.broadcast.to(id).emit("send", newData);
    }

  });

  socket.on("userInformation", function (data) {
    socketsStatus[socketId] = data;

    io.sockets.emit("usersUpdate",socketsStatus);
  });


  socket.on("disconnect", function () {
    delete socketsStatus[socketId];
  });

});
After that create a front-end javascript file in /public/js/index.js and put codes below into it:
const userStatus = {
  microphone: false,
  mute: false,
  username: "user#" + Math.floor(Math.random() * 999999),
  online: false,
};

const usernameInput = document.getElementById("username");
const usernameLabel = document.getElementById("username-label");
const usernameDiv = document.getElementById("username-div");
const usersDiv = document.getElementById("users");

usernameInput.value = userStatus.username;
usernameLabel.innerText = userStatus.username;


window.onload = (e) => {
  mainFunction(1000);
};

var socket = io("ws://localhost:3000");
socket.emit("userInformation", userStatus);


function mainFunction(time) {


  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    var madiaRecorder = new MediaRecorder(stream);
    madiaRecorder.start();

    var audioChunks = [];

    madiaRecorder.addEventListener("dataavailable", function (event) {
      audioChunks.push(event.data);
    });

    madiaRecorder.addEventListener("stop", function () {
      var audioBlob = new Blob(audioChunks);

      audioChunks = [];

      var fileReader = new FileReader();
      fileReader.readAsDataURL(audioBlob);
      fileReader.onloadend = function () {
        if (!userStatus.microphone || !userStatus.online) return;

        var base64String = fileReader.result;
        socket.emit("voice", base64String);

      };

      madiaRecorder.start();


      setTimeout(function () {
        madiaRecorder.stop();
      }, time);
    });

    setTimeout(function () {
      madiaRecorder.stop();
    }, time);
  });


  socket.on("send", function (data) {
    var audio = new Audio(data);
    audio.play();
  });

  socket.on("usersUpdate", function (data) {
    usersDiv.innerHTML =   ;
    for (const key in data) {
      if (!Object.hasOwnProperty.call(data, key)) continue;

      const element = data[key];
      const li = document.createElement("li");
      li.innerText = element.username;
      usersDiv.append(li);

    }
  });

}

usernameLabel.onclick = function () {
  usernameDiv.style.display = "block";
  usernameLabel.style.display = "none";
}

function changeUsername() {
  userStatus.username = usernameInput.value;
  usernameLabel.innerText = userStatus.username;
  usernameDiv.style.display = "none";
  usernameLabel.style.display = "block";
  emitUserInformation();
}

function toggleConnection(e) {
  userStatus.online = !userStatus.online;

  editButtonClass(e, userStatus.online);
  emitUserInformation();
}

function toggleMute(e) {
  userStatus.mute = !userStatus.mute;

  editButtonClass(e, userStatus.mute);
  emitUserInformation();
}

function toggleMicrophone(e) {
  userStatus.microphone = !userStatus.microphone;
  editButtonClass(e, userStatus.microphone);
  emitUserInformation();
}


function editButtonClass(target, bool) {
  const classList = target.classList;
  classList.remove("enable-btn");
  classList.remove("disable-btn");

  if (bool)
    return classList.add("enable-btn");

  classList.add("disable-btn");
}

function emitUserInformation() {
  socket.emit("userInformation", userStatus);
}


run command:
node index.js
Congratulation! Now you have a realtime voice chat app created with nodejs and socketIo.I hope useful this article to you and thank you to read it.

Discussion (10)
Subscribe
pic
Add to the discussion
 
judgegodwins profile image
Judgegodwins
•
Aug 3  21

Is there a GitHub repo for this?


3
Like
 
hosseinmobarakian profile image
h_mobarakian
•
Aug 3  21

No


1
Like
 
akash4919 profile image
Akash4919
•
Apr 18

Friend I am developing a backend server of a game where players can communicate with each other with real time audio and chat message can you help me a little with it......Thankyou and your this code helped me alot


Like
 
perrut profile image
Matheus Perrut
•
Sep 8  21

Thank you for that!!!


1
Like
 
lylest profile image
wackyizzy
•
Jul 28  21

looking forward to try this


1
Like
 
robbelroot profile image
Robert S.
•
Mar 19

Hmm i m getting a data.split error, that i cant read split of null, so data seems to be null.


2
Like
 
itsfuad profile image
Fuad Hasan
•
Apr 29

use default values like
data ||= [];

1
Like
 
itsfuad profile image
Fuad Hasan
•
Apr 29

Someone upload the structured code to github. I ve become too lazy to structure this code🙃


Like
 
disalprabhath profile image
Disal Prabhath
•
Mar 30

i need more help to build this software


1
Like
 
itsfuad profile image
Fuad Hasan
•
Apr 29

Would be nice if there was a running demo app.


1
Like
Code of Conduct • Report abuse
👋 Welcome new DEV members in our Welcome Thread
Say hello to the newest members of DEV.

Read next
amin_deraiya profile image
React detect div reach top and bottom
Amin Deraiya - Aug 4

herryjobn profile image
Amazing JavaScript Games | Play Now
herryjobn - Aug 26

duxtech profile image
Paracetamol.js💊| #183: Explica este código JavaScript
Cristian Fernando - Aug 25

hillliu profile image
What is really partial update [React Hook] look like?
Hill Liu - Aug 7


h_mobarakian
Follow
nodejs developer
LOCATION
iran/khoramabad
WORK
backend engineer
JOINED
22 مايو 2021
More from h_mobarakian
Create a custom cursor for your website
#javascript #dom #html #css
Create a chat app with Nodejs and Reactjs
#node #react #socket #realtime
Create an Instagram downloader API with Nodejs
#javascript #node
const userStatus = {
  microphone: false,
  mute: false,
  username: "user#" + Math.floor(Math.random() * 999999),
  online: false,
};

const usernameInput = document.getElementById("username");
const usernameLabel = document.getElementById("username-label");
const usernameDiv = document.getElementById("username-div");
const usersDiv = document.getElementById("users");

usernameInput.value = userStatus.username;
usernameLabel.innerText = userStatus.username;


window.onload = (e) => {
  mainFunction(1000);
};

var socket = io("ws://localhost:3000");
socket.emit("userInformation", userStatus);


function mainFunction(time) {


  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    var madiaRecorder = new MediaRecorder(stream);
    madiaRecorder.start();

    var audioChunks = [];

    madiaRecorder.addEventListener("dataavailable", function (event) {
      audioChunks.push(event.data);
    });

    madiaRecorder.addEventListener("stop", function () {
      var audioBlob = new Blob(audioChunks);

      audioChunks = [];

      var fileReader = new FileReader();
      fileReader.readAsDataURL(audioBlob);
      fileReader.onloadend = function () {
        if (!userStatus.microphone || !userStatus.online) return;

        var base64String = fileReader.result;
        socket.emit("voice", base64String);

      };

      madiaRecorder.start();


      setTimeout(function () {
        madiaRecorder.stop();
      }, time);
    });

    setTimeout(function () {
      madiaRecorder.stop();
    }, time);
  });


  socket.on("send", function (data) {
    var audio = new Audio(data);
    audio.play();
  });

  socket.on("usersUpdate", function (data) {
    usersDiv.innerHTML =   ;
    for (const key in data) {
      if (!Object.hasOwnProperty.call(data, key)) continue;

      const element = data[key];
      const li = document.createElement("li");
      li.innerText = element.username;
      usersDiv.append(li);

    }
  });

}

usernameLabel.onclick = function () {
  usernameDiv.style.display = "block";
  usernameLabel.style.display = "none";
}

function changeUsername() {
  userStatus.username = usernameInput.value;
  usernameLabel.innerText = userStatus.username;
  usernameDiv.style.display = "none";
  usernameLabel.style.display = "block";
  emitUserInformation();
}

function toggleConnection(e) {
  userStatus.online = !userStatus.online;

  editButtonClass(e, userStatus.online);
  emitUserInformation();
}

function toggleMute(e) {
  userStatus.mute = !userStatus.mute;

  editButtonClass(e, userStatus.mute);
  emitUserInformation();
}

function toggleMicrophone(e) {
  userStatus.microphone = !userStatus.microphone;
  editButtonClass(e, userStatus.microphone);
  emitUserInformation();
}


function editButtonClass(target, bool) {
  const classList = target.classList;
  classList.remove("enable-btn");
  classList.remove("disable-btn");

  if (bool)
    return classList.add("enable-btn");

  classList.add("disable-btn");
}

function emitUserInformation() {
  socket.emit("userInformation", userStatus);
}