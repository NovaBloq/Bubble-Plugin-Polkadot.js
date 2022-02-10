function(instance, properties, context) {

    if (instance.data.api) {
        instance.data.api.rpc.chain.getHeader().then((header) => {
            instance.publishState('last_block_nr',header.number.toNumber());
        })
    }

}