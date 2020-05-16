package com.vpnAquarius

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.*

class VPNPackage: ReactPackage {
  override fun createNativeModules(
      reactContext: ReactApplicationContext
  ): MutableList<NativeModule> = arrayListOf(VPNModule(reactContext))

  override fun createViewManagers(
      reactContext: ReactApplicationContext
  ): MutableList<ViewManager<View, ReactShadowNode<*>>> = Collections.emptyList()
}
