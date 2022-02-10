function(instance, context) {

    const defaultRPC = 'wss://rpc.polkadot.io';
    const westendRPC = 'wss://westend-rpc.polkadot.io';
    const runAPI = (rpc) => {
        const wsProvider = new window.pd_plugin.WsProvider(rpc);
        window.pd_plugin.ApiPromise.create({ provider: wsProvider }).then((api) => {
            instance.data.api = api;
            instance.data.chainDecimals = api.registry.chainDecimals[0];
			window.polkadotpluginApi = api;
            const chainInfo = api.registry.getChainProperties();
            instance.publishState('chain_symbol', chainInfo.tokenSymbol.toHuman()[0]);
            instance.publishState('chain_decimals', instance.data.chainDecimals);// publish chain decimals
            instance.publishState('connected_chain_name', api.runtimeChain.toHuman())// publish chain name
            instance.publishState('api_is_initializing', false);
        }).catch(err => {
            instance.publishState('api_is_initializing', false);
            console.log(err);
        })
    }

    instance.data.convertBalance = (balance) => {
        const balanceConverted = window.pd_plugin.utils.formatBalance(
            balance,
            { withSi: false, forceUnit: '-' },
            instance.data.chainDecimals
        );
        return balanceConverted;
    }

    instance.data.loadApi = (conf) => {
        if (window.polkadotpluginApi) {
            //?? remove global 
            // API already loaded in plugin Wallet element
            instance.data.api = window.polkadotpluginApi;
        } else if (!instance.data.api) {
            instance.publishState('api_is_initializing', true);
            const rpc = conf.rpc ? conf.rpc : defaultRPC;
            runAPI(rpc);
        }
    }
}