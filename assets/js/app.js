function logInOrRegister(){
  const emailValue = email.value;
  const passwordValue = password.value;

  firebase.auth().createUserWithEmailAndPassword()
    .then(()=> {

    })

    .catch(()=>{

    })
}