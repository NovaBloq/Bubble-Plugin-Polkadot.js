function(instance, properties, context) {
    const { wallet_to_sign_with, message } = properties;
    const msg = window.pd_plugin.utils.stringToU8a(message);
    //reset related states before signing
	instance.publishState('signature', "");
    
    const sign = (pair) => {
        const signature = pair.sign(msg);
        instance.publishState('signature', JSON.stringify(Array.from(signature)));
        instance.triggerEvent('signed');
    }

    if (instance.data.keyring) {
        //find pair
        for (let i = 0; i < instance.data.keyring.pairs.length; i++) {
            if (instance.data.keyring.pairs[i].address == wallet_to_sign_with) {
                sign(instance.data.keyring.pairs[i]);
                return;
            }
        }
    }

}