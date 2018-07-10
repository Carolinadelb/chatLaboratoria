window.onload = ()=>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      //estamos logueados
      loggedOut.style.display = "none";
      loggedIn.style.display= "block";
      console.log("User > "+JSON.stringify(user));
      
    }else{
      //no estamos logueados
      loggedOut.style.display = "block";
      loggedIn.style.display= "none";
    }
  });


  firebase.database().ref('messages')
   .limitToLast(1)
   .once('value')
   .then((messages)=>{
     console.log("mensajes > " +JSON.stringidy(messages));
  })
  .catch(()=>{

  });


  firebase.database().ref('messages')
    .on('child_added', (newMessage)=>{
      messageContainer.innerHTML += `
       <p>Nombre: ${newMessage.val().creatorName}</p>
       <p>${newMessage.val().text}</p>
      `
    });
}

function logInOrRegister(){
  const emailValue = email.value;
  const passwordValue = password.value;

  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(()=> {
      console.log("Usuario registrado");
    })

    .catch(()=>{
      console.log("Error de firebase > " +error.code);
      console.log("Error de firebase, mensaje > "+error.message);
    })
}

function login(){
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(()=>{
      console.log("usuario con login exitoso");
    })
    .catch(()=>{
      console.log("Error de firebase > "+error.code);
      console.log("Error de firebase, mensaje > "+error.mensaje);
    });
}

function logout(){
  firebase.auth().signOut()
  .then(()=>{
    console.log("Bella Bella Ciao");
  })
  .catch();
}

function loginFacebook(){
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope("user_birthday");tienen que pedirle permiso a facebook.
  provider.setCustomParameters({
    'display':'popup'
  });
  firebase.auth().signInWithPopup(provider)
  .then(()=>{
    console.log("Login con facebook");
  
  })
  .catch((error)=>{
    console.log("")
  })
}


//firebase database
// messsages/456578 

function sendMessage(){
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value;
  //para tener uuna nuevsa llave en la coleccion messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;
  
  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator : currentUser.uid,
    creatorName : currentUser.displayName,
    text : messageAreaText
  })
}