function(instance, properties, context) {


  let addresses = [];
    
   //Extract addresses from pairs
   for(let i = 0; i < instance.data.keyring.pairs.length; i++){
       addresses.push(instance.data.keyring.pairs[i].address);
        if(i == instance.data.keyring.pairs.length - 1){
            instance.triggerEvent('all_pairs_ready');
            instance.publishState('keyring_pairs',addresses);
        }
   }


}