
function SubirImgStorage(direccion,firebaseStorage,archivo,tipo){
var downloadURL;
const ref=firebaseStorage.ref(direccion);

let task={}
if (tipo == 1) {
 task=ref.putString(archivo,'data_url');
}
else{
 task=ref.put(archivo);
}


var self=this;
var promise = new Promise(
        function(resolve,reject){
            task.on('state_changed',function(snapshot){

            },(error) =>{
              console.log(error);
            },()=>{
              task.snapshot.ref.getDownloadURL().then(function(dURL) {
                resolve(downloadURL= dURL);
              });

            })
        })
        return promise;
}


exports.SubirImgStorage=SubirImgStorage;
