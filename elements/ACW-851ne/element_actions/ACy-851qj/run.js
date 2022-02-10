function(instance, properties, context) {


    const { signature, message, wallet_address } = properties;
    const signature_u8 = new Uint8Array(JSON.parse(signature));
    const verify = (pair) => {
        const isValid = pair.verify(message, signature_u8, pair.publicKey);
        instance.publishState('signature_is_valid', isValid);
    }

    if (instance.data.keyring) {
        //find pair
        for (let i = 0; i < instance.data.keyring.pairs.length; i++) {
            if (instance.data.keyring.pairs[i].address == wallet_address) {
                verify(instance.data.keyring.pairs[i]);
                return;
            }
        }
    }


}