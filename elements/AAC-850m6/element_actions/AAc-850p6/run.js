function(instance, properties, context) {


  if(instance.data.connectApp) instance.data.connectApp(properties);
  else console.warn("Unable to initialize Polkadot Wallet: Make sure the plugin element is not in a hidden element");


}