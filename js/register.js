document.getElementById("register").onclick = function(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("name").value;

    firebase.auth().createUserWithEmailAndPassword(email,password).then((userCred) =>{

        let userId = userCred.user.uid;

        firebase.firestore().collection("users").doc(userId).set({

            name: fullName,
            email: email,
            userId: userId

        }).then(()=>{

            window.location.href = "home.html";
        })
    })

}