function(instance, properties, context) {
	const {mnemonic,json_data,type} = properties;
    
    try{
    	const newpair = instance.data.keyring.addFromUri(mnemonic, json_data, type);

    	instance.publishState('keyring_pairs_available',instance.data.keyring.pairs.length);
        instance.publishState('added_pair_address',newpair.address);

    	instance.triggerEvent('wallet_added_to_keyring');
    }catch(e){
    	console.log(e);
    }

  

}