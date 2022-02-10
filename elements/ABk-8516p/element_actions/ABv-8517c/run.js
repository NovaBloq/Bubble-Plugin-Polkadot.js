function(instance, properties, context) {


    if (!instance.data.api) return;

    instance.data.api.rpc.chain.subscribeNewHeads((header) => {
        instance.publishState('last_block_nr', header.number.toNumber());
        instance.triggerEvent('new_block');
    }).then((susbcription) => {
        instance.data.subscription = susbcription;
    })

}