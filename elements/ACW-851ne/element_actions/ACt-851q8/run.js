function(instance, properties, context) {

	try{
        instance.data.keyring.removePair(properties.address);
        instance.publishState('keyring_pairs_available',instance.data.keyring.pairs.length);
        instance.triggerEvent('key_removed');
    }catch(e){
        console.log(e);
    }


}