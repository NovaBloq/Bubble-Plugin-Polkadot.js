function(instance, properties, context) {

    const { message, signature, address } = properties;

    const isValidSignature = (signedMessage, signature, address) => {
        const publicKey = window.pd_plugin.utils.decodeAddress(address);
        const hexPublicKey = window.pd_plugin.utils.u8aToHex(publicKey);

        return window.pd_plugin.utils.signatureVerify(signedMessage, signature, hexPublicKey).isValid;
    };

    const isValid = isValidSignature(message, signature, address);

    instance.publishState('is_signature_valid',isValid);

}