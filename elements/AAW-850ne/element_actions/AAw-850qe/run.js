function(instance, properties, context) {

    const { address } = properties;
    const { encodeAddress, isHex, hexToU8a, decodeAddress } = window.pd_plugin.utils;
    try {
        encodeAddress(
            isHex(address)
                ? hexToU8a(address)
                : decodeAddress(address)
        );
        instance.publishState('is_address_valid', true);
    } catch (error) {
        instance.publishState('is_address_valid', false);
    }
}