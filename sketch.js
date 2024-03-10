var input,heading, heading1, password;

var button;
var database;
var docId;
function setup() 
{
  createCanvas(400, 400);
  background(178,255,102);
 
  input = createInput()
  input.position(5,60)


  heading = createElement('h4', 'Enter your EmailId:');
  heading.position(5, 20);


  heading1 = createElement('h4', 'Enter your Password:');
  heading1.position(5, 100);

  password = createInput()
  password.position(5,140)

  button = createButton("Submit")
  button.position(5,170)
  
  database =  firebase.firestore()
}

function draw() {

  button.mousePressed(()=>{
    if(input.value()!="" && password.value()!=""){
    firebase.auth().signInWithEmailAndPassword(input.value(), password.value())
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      database.collection("users").where("email","==", input.value()).get().then((docs)=>{

        docs.forEach((doc)=>{

          console.log("Document",doc)
          if (doc.exists) {
            console.log("Document ID:", doc.id);
            database.collection("users").doc(doc.id).delete()
            console.log("Document deleted succesfuly");

          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }

        })
       
      })
          
        firebase.auth().currentUser.delete().then(() => {
          
          alert("Account Deleted")
          // User deleted.
        }).catch((error) => {
          console.log(error)
        });

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
  }
  else{
    alert("Please fill in both the fields")
  }

    input.value("");
    password.value("");
  


  })
  
}

