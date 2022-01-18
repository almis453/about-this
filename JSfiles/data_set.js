var admin = import("firebase-admin");

//1.サービスアカウント鍵を生成し、serviceAccountKey.jsonでリネームしてフォルダ直下に配置
var serviceAccount = import("./serviceAccountKey.json");

admin.initializeApp({
    //credential: admin.credential.cert(serviceAccount),
    //2.Realtime DatabaseのページでdatabaseURLを確認して反映
    databaseURL : "https://firetest-818d1-default-rtdb.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("protoout/studio");

var usersRef = ref.child("sensor");
usersRef.set({
    "temperature" : 26,
    "humidity" : 43
});

ref.on("value" , function(snapshot){
    console.log("value Changed!!!");
    console.log(snapshot.val());
},
function(errorObject){
    console.log("failed : " + errorObject.code);
}
);