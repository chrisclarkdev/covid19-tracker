// offline data
db.enablePersistence()
  .catch(err => {
    if(err.code == 'failed-precondition'){
      console.log('persistence failed!!');
    } else if (err.code == 'unimplemented'){
      console.log('persistence is not available');
    }
  })
// realtime listener
db.collection('countries').onSnapshot((snapshot) => {
 // console.log(snapshot.docChanges());
 snapshot.docChanges().forEach((change) => {
   //console.log(change, change.doc.data(), change.doc.id)
   if(change.type === "added"){
     //add  the document data to the web page
   }
   if(change.type === "removed") {
     //remove data from the web page
   }
 })
})