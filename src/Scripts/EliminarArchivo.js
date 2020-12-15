

 function EliminarImgStorage(direccion,firebaseStorage){
  let ref = firebaseStorage.ref(direccion);
  ref.listAll().then(dir => {
    dir.items.forEach(fileRef => {
      var dirRef = firebaseStorage.ref(fileRef.fullPath);
      dirRef.getDownloadURL().then(function(url) {
        var imgRef = firebaseStorage.refFromURL(url);
        imgRef.delete().then(function() {
          return true;
        }).catch(function(error) {
          return false;
          console.log(error);
        });
      });
    });
  }).catch(error => {
    console.log(error);
  });
}


exports.EliminarImgStorage=EliminarImgStorage;
