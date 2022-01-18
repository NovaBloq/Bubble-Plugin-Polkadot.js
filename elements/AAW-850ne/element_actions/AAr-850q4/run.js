function(instance, properties, context) {
    const new_mnemonic = window.pd_plugin.utils.mnemonicGenerate();
    const isValidMnemonic = window.pd_plugin.utils.mnemonicValidate(new_mnemonic);
    if (isValidMnemonic) {
        instance.publishState('generated_mnemonic', new_mnemonic);
        instance.triggerEvent('mnemonit_generated');
    } else {
        console.log('Error while genereting the mnemonic string')
    }
}