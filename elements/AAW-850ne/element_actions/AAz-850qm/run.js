function(instance, properties, context) {

    const { message } = properties;
    const messagePreEncryption = window.pd_plugin.utils.stringToU8a(message);
    const secret = window.pd_plugin.utils.randomAsU8a();
    // Encrypt the message
    const { encrypted, nonce } = window.pd_plugin.utils.naclEncrypt(messagePreEncryption, secret);
    const encrypted_array = JSON.stringify(Array.from(encrypted));
    const secret_array = JSON.stringify(Array.from(secret));
    const nonce_array = JSON.stringify(Array.from(nonce));


    instance.publishState('encrypted_message', encrypted_array);
    instance.publishState('encrypted_nonce', nonce_array);
    instance.publishState('encrypted_secret', secret_array);
}