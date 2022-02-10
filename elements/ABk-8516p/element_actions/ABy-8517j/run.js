function(instance, properties, context) {

    const { address } = properties;

    if (!instance.data.api) return;

    instance.data.api.query.system.account(address, (res) => {
        instance.publishState('new_balance', instance.data.convertBalance(res.data.free));
        instance.triggerEvent('balance_changed');
    }).then((susbcription) => {
        instance.data.balance_subscription = susbcription;
    })

}