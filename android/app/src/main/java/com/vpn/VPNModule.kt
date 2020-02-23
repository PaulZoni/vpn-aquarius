package com.vpn

import com.facebook.react.bridge.*
import com.facebook.react.uimanager.IllegalViewOperationException

class VPNModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
  var context: ReactApplicationContext? = context

  override fun getName(): String {
    return "VPNModule"
  }

  @ReactMethod
  fun startVpn(promise: Promise) {
    try {
      VPN.instance.startVpn { string -> promise.resolve(string) }
    } catch (e: IllegalViewOperationException) {
      println(e.message)
      promise.reject(e.message)
    }
  }

  @ReactMethod
  fun stopVpn(promise: Promise) {
    try {
      VPN.instance.stopVpn { string  -> promise.resolve(string) }
    } catch (e: IllegalViewOperationException) {
      println(e.message)
      promise.reject(e.message)
    }
  }
}