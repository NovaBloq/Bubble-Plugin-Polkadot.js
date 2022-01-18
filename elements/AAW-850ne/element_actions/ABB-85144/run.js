function(instance, properties, context) {
    const { encrypted_message, secret, nonce } = properties;
    const encrypted_uintarray = new Uint8Array(JSON.parse(encrypted_message));
    const secret_uintarray = new Uint8Array(JSON.parse(secret));
    const nonce_uintarray = new Uint8Array(JSON.parse(nonce));

    const messageDecrypted = window.pd_plugin.utils.naclDecrypt(encrypted_uintarray, nonce_uintarray, secret_uintarray);
    const decrypted_string = window.pd_plugin.utils.u8aToString(messageDecrypted);

    instance.publishState('decrypted_message', decrypted_string);

}