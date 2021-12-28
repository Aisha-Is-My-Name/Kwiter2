var firebaseConfig = {
      apiKey: "AIzaSyB838J2b6l6QAElGViFtmPOFRCSz78vNl8",
      authDomain: "kwitter-48864.firebaseapp.com",
      databaseURL: "https://kwitter-48864-default-rtdb.firebaseio.com",
      projectId: "kwitter-48864",
      storageBucket: "kwitter-48864.appspot.com",
      messagingSenderId: "813987702006",
      appId: "1:813987702006:web:4b8bd2b8682da900bf38d7",
      measurementId: "G-F1KTC865G6"
    };
    firebase.initializeApp(firebaseConfig);
    function send(){
          msg=document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name:user_name,
                message:msg,
                like:0

          });
          document.getElementById("msg").value="";
      } 

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4>"+ name +"<img class='user_tick' src='tick.png'> </h4>";
         msg_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
         like_button = "<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='update_like(this.id)'>";
         span_with_tag = "<span class= 'glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
         row=name_with_tag + msg_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML+= row;
//End code
      } });  }); }
getData();
function update_like(message_id){
      console.log("clicked on the like button! ^^"+message_id);
      button_id=message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("kwitter.html");
}