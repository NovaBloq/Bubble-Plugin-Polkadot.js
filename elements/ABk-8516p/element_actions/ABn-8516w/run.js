function(instance, properties, context) {

    const { address } = properties;
    if (instance.data.api) {
        console.log(address);
        instance.data.api.query.system.account(address).then(result => {
            console.log(result)
            const balance = instance.data.convertBalance(result.data.free);
            instance.publishState('get_balance_result',balance);
        })
    }

}