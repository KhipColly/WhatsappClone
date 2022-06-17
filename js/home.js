firebase.auth().onAuthStateChanged((user)=>{

    if(user){

        //get userid
        let userid = user.uid;

        //pull all users

        firebase.firestore().collection("users").get().then((querySnapshot)=>{

            let content = '';
            
            querySnapshot.forEach((doc)=>{

                let username = doc.data().name;
                let theUseId = doc.data().userId;

                let thelink = "home.html" + "?" + theUseId;

                content += '<a href="'+thelink+'" class="userCont">';
                content += '<div class="userProfile"></div>'
                content += '<div>';
                    content += '<h6>'+username+'</h6>';
                    content += '<p>0700000000</p>'
                content += '</div>';
                content += '</a>';

            })
            $("#allUsers").append(content);
        })
        //


        //receiving the id from the URI

        let receivedID = decodeURIComponent(window.location.search);
        let theUserId =receivedID.substring(1);

        firebase.firestore().collection("users").doc(theUserId).get().then((doc) =>{

            let username = doc.data().name;

            document.getElementById("recUserName").innerText = username;
            document.getElementById("receivedPhone").innerText = "0700000000";
        })

        //sending chats to db
        document.getElementById("sendChat").onclick = function(){

            let chat = document.getElementById("chat").value;
            let timeStamp = new Date();

            let sendChat = firebase.firestore().collection("chats").doc();
            sendChat.set({

                message: chat,
                messageFrom: userid,
                messageTo: theUserId,
                messageRead: "false",
                timeStamp: timeStamp,
                docId: sendChat.id

            }).then(()=>{
                window.location.reload();
            })
        }

        //pulling the chats

        firebase.firestore().collection("chats").get().then((querySnapshot)=>{

            let content = '';
            querySnapshot.forEach((doc)=>{
                let message = doc.data().message;
                let messageFrom  = doc.data().messageFrom;
                let messageTo  = doc.data().messageTo;

                if(messageFrom == userid && messageTo == theUserId){

                    content += '<div class="thechatTo">';
                        content += '<p>'+message+'</p>';
                    content += '</div>';

                }else if(messageTo == userid && messageFrom == theUserId){
                    content += '<div class="thechatFrom">';
                        content += '<p>'+message+'</p>';
                    content += '</div>';
                }

            })
            $("#allChats").append(content);
        })





    

    }else{
        window.location.href = "index.html";
    }
})