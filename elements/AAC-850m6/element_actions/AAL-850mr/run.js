function(instance, properties, context) {

    const { message } = properties;

    if (instance.data.account) {
        window.pd_plugin.web3FromSource(instance.data.account.meta.source).then((injector) => {
            if (injector) {
                const signRaw = injector.signer.signRaw;
                if (signRaw) {
                    signRaw({
                        address: instance.data.account.address,
                        data: window.pd_plugin.utils.stringToHex(message),
                        type: 'bytes'
                    }).then((signed) => {
                        instance.publishState('signature', signed.signature);
                        instance.triggerEvent('message_signed');
                    }).catch(err => {
                        instance.data.error(err, 'signing')
                    })
                } else {
                    console.log('Sign raw not defined')
                }
            } else {
                console.log('no injector ', injector);
            }
        });
    }

}