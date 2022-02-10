function(instance, properties, context) {

    const { address, block_number } = properties;

    if (!instance.data.api) return;

    const balanceAtBlock = (balancePrev) => {
        const balanceAtBlock = instance.data.convertBalance(balancePrev.data.free);
        instance.publishState('balance_at_block', balanceAtBlock);
        instance.triggerEvent('get_balance_at_block_is_ready');
    }

    //Get hash of given block number
    instance.data.api.rpc.chain.getBlockHash(block_number).then(blockToCheckhash => {
        //Get balance at block
        instance.data.api.query.system.account.at(blockToCheckhash, address).then((atBlockBalance) => {
            balanceAtBlock(atBlockBalance);
        })
    });

}