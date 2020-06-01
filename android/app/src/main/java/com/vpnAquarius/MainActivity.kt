package com.vpnAquarius

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView
import com.vpnAquarius.ui.interstitialAd.MyInterstitialAd

public class MainActivity: ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  override fun getMainComponentName(): String? {
    return "vpn"
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    VPN.instance.login { string -> println(string) }
    MyInterstitialAd.instance.initMyInterstitialAd(this)
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object: ReactActivityDelegate(this, mainComponentName) {
      override fun createRootView(): RNGestureHandlerEnabledRootView {
        return RNGestureHandlerEnabledRootView(context)
      }

    }
  }

  override fun onDestroy() {
    VPN.instance.logout { string -> println(string) }
    VPN.instance.stopVpn { string -> println(string) }
    super.onDestroy()
  }
}
