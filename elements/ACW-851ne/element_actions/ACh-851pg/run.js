function(instance, properties, context) {

	const {pair_nr,pair_address} = properties;
    
    const publishMeta = meta=>{ instance.publishState('pair_metadata',meta); }
        
    if(typeof pair_nr == 'number'){
        if(instance.data.keyring.pairs[pair_nr]) publishMeta(instance.data.keyring.pairs[pair_nr].meta);
    }else if(pair_address){
        for(let i = 0; i < instance.data.keyring.pairs.length; i++){
            if(instance.data.keyring.pairs[i].address == pair_address){
                publishMeta(instance.data.keyring.pairs[i].meta)
            }
        }
    }
  

}