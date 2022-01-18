function(instance, properties, context) {

    const { data, hash_method } = properties;
    //Possible methods: blake2,keccak,xxhash
    const methodName = hash_method + "AsHex";
    const hash = window.pd_plugin.utils[methodName](data);

    instance.publishState('hash_data_result', hash);

}