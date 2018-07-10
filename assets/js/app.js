function logInOrRegister(){
  const emailValue = email.value;
  const passwordValue = password.value;

  firebase.auth().createUserWithEmailAndPassword()
    .then(()=> {
      console.log("Usuario registrado");
    })

    .catch(()=>{
      console.log("Error de firebase > " +error.code);
      console.log("Error de firebase, mensaje > "+error.message);
    })
}