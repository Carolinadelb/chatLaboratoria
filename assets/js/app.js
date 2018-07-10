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