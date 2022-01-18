function(instance, properties, context) {

    const { addresses, threshold } = properties;
    const addresses_list = addresses.get(0, addresses.length());
    const SS58Prefix = 0;

    const multiAddress = window.pd_plugin.utils.createKeyMulti(addresses_list, threshold);

    // Convert byte array to SS58 encoding.
    const Ss58Address = window.pd_plugin.utils.encodeAddress(multiAddress, SS58Prefix);

    instance.publishState('multisig_address', Ss58Address);

}