function(instance, context) {

instance.data.loadApi = (conf)=>{
    
    if(!instance.data.keyring){
        instance.publishState('keyring_is_initializing',true);
        window.pd_plugin.utils.cryptoWaitReady().then(()=>{
            instance.data.keyring = new window.pd_plugin.utils.Keyring();
            instance.publishState('keyring_is_initializing',false);
            instance.publishState('keyring_pairs_available',0);
    	})
    }else{
        instance.publishState('keyring_is_initializing',false);
    }
}

}