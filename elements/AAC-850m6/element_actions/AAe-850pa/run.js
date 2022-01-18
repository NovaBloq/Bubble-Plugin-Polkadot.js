function(instance, properties, context) {
    const { to_wallet, amount_to_send } = properties;
    const amount = amount_to_send * 1000;
    //reset states
    instance.publishState('transaction_status', '');
    instance.publishState('transaction_hash', '');
    if (instance.data.account) {
        instance.publishState('transaction_status', 'Awaiting confirmation from user');
        let finalized = false; // prevent multiple event triggering
        const transferExtrinsic = instance.data.api.tx.balances.transfer(to_wallet, amount * 1e9);//convert to big number
        window.pd_plugin.web3FromSource(instance.data.account.meta.source).then((injector) => {
            transferExtrinsic.signAndSend(instance.data.account.address, { signer: injector.signer }, ({ status }) => {
                if (status.isInBlock || status.type == "Finalized" && !finalized) {
                    finalized = true;
                    instance.publishState('transaction_hash', transferExtrinsic.hash.toHex());
                    instance.triggerEvent('transaction_sent');
                } else {
                    instance.publishState('transaction_status', status.type);
                    console.log(`Current status: ${status.type}`);
                }
            }).catch((err) => {
                instance.data.error(err, 'sending')
            });
        })
    } else {
        instance.triggerEvent('wallet_not_connected');
    }
}