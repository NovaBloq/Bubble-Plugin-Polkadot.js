function(instance, context) {

    instance.data.account = null;
    instance.data.api = null;
    instance.data.rpc = "";
    const mainRPC = 'wss://rpc.polkadot.io';
    const westendRPC = 'wss://westend-rpc.polkadot.io';
    instance.data.initializeApi = () => {
        const wsProvider = new window.pd_plugin.WsProvider(instance.data.rpc);
        window.pd_plugin.ApiPromise.create({ provider: wsProvider }).then((api) => {
            instance.data.api = api;
            console.log(instance.data.api);
            instance.publishState('wallet_is_loading', false);
        }).catch(err => {
            instance.publishState('wallet_is_loading', false);
            console.log(err);
        })
    }

    instance.data.installed = () => {
        window.pd_plugin.web3AccountsSubscribe((injectedAccounts) => {
            if (injectedAccounts.length < 1) {
                instance.data.account = null;
                instance.publishState('connected_wallets', []);
                instance.triggerEvent('wallet_not_connected');
                instance.publishState('wallet_is_loading', false);
            } else {
                instance.data.account = injectedAccounts[0];
                let addresses = [];
                let names = [];
                injectedAccounts.map((account) => {
                    addresses.push(account.address);
                    names.push(account.meta.name);
                })
                instance.publishState('connected_wallets', addresses);
                instance.publishState('connected_wallets_names', names);
                if (!instance.data.api) instance.data.initializeApi();
            }
        });
    }

    const setRPC = (rpc) => {
        instance.data.rpc = rpc ? rpc : mainRPC;
    }

    instance.data.connectApp = (conf) => {
        setRPC(conf.rpc);
        window.pd_plugin.web3Enable(conf.app_name).then(extensions => {
            if (extensions.length) {
                instance.publishState('is_extension_installed', true);
                instance.publishState('wallet_is_loading', true);
                instance.data.installed();
            } else {
                instance.data.provider = null;
                instance.publishState('is_extension_installed', false);
                instance.publishState('wallet_is_loading', false);
                instance.triggerEvent('extension_not_installed');
            }
        })
    }

    instance.data.error = (err, event) => {
        if (err.message && err.message == "Cancelled") {
            instance.triggerEvent(`user_canceled_${event}`);
        } else if (err.message && err.message.includes('Inability to pay')) {
            instance.triggerEvent('not_enough_balance')
        } else {
            console.log('Error ', err.message);
        }
    }

}