package com.vpnAquarius.ui.interstitialAd

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class InterstitialAdModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {

  override fun getName(): String {
    return "InterstitialAdModule"
  }

  @ReactMethod
  fun show() {
    MyInterstitialAd.instance.show()
  }
}