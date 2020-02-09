package com.vpn

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.uimanager.IllegalViewOperationException

class VPNModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
  var context: ReactApplicationContext? = context

  override fun getName(): String {
    return "VPNModule"
  }

  @ReactMethod
  fun startVpn(callback: Callback, errorCallback: Callback) {
    try {
      VPN.instance.startVpn { string -> callback.invoke(string) }
    } catch (e: IllegalViewOperationException) {
      println(e.message)
      errorCallback.invoke(e.message)
    }
  }

  @ReactMethod
  fun stopVpn(callback: Callback, errorCallback: Callback) {
    try {
      VPN.instance.stopVpn { string  -> callback.invoke(string) }
    } catch (e: IllegalViewOperationException) {
      println(e.message)
      errorCallback.invoke(e.message)
    }
  }
}