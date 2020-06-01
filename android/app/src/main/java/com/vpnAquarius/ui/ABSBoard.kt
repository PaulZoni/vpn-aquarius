package com.vpnAquarius.ui

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.google.android.gms.ads.*

class ABSBoard: SimpleViewManager<ReactAdView>() {
  override fun createViewInstance(reactContext: ThemedReactContext): ReactAdView {
    val v = ReactAdView(reactContext)
    // prod ca-app-pub-2335690523420671/7006242659
    // test ca-app-pub-3940256099942544/6300978111
    v.setAdUnitID("ca-app-pub-2335690523420671/7006242659")
    v.setAdSize(AdSize.BANNER)
    v.loadBanner()
    return v
  }

  override fun getName(): String  = "ABSBoard"

}

