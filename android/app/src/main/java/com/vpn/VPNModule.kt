package com.vpn

import android.os.Handler
import android.os.Looper
import android.os.Message
import android.widget.Toast
import com.anchorfree.partner.api.data.Country
import com.facebook.react.bridge.*
import java.math.BigDecimal
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.facebook.react.uimanager.IllegalViewOperationException
import java.math.RoundingMode

class VPNModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
  private var context: ReactApplicationContext? = context
  private var handler: Handler? = null

  override fun getName(): String {
    return "VPNModule"
  }

  init {
    handler = object: Handler(Looper.getMainLooper()) {
      override fun handleMessage(msg: Message?) {
      }
    }
    VPN.instance.getVpnState {
      Toast.makeText(context, "state", Toast.LENGTH_SHORT).show()
    }
    VPN.instance.stateListener {
      if (it == "VpnException:Vpn transport didn't establish connection in 30 seconds.") {
        Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
      } else {
        Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
      }
    }

    VPN.instance.trafficListener { rx, tx ->
      val payload: WritableMap = Arguments.createMap()
      payload.putDouble("receive", BigDecimal((rx.toDouble() / 1024) / 1024).setScale(2, RoundingMode.HALF_EVEN).toDouble())
      payload.putDouble("transmit", BigDecimal((tx.toDouble() / 1024) / 1024).setScale(2, RoundingMode.HALF_EVEN).toDouble())
      context
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit("trafficEvent", payload)
    }

  }

  @ReactMethod
  fun startVpn(promise: Promise) {
    BackgroundTask(NativeModuleCallExceptionHandler {
      Toast.makeText(context, "error", Toast.LENGTH_SHORT).show()
    }) {
      try {
        VPN.instance.startVpn { string ->
          promise.resolve(string)
        }
      } catch (e: IllegalViewOperationException) {
        println(e.message)
      }
    }.execute()
  }

  @ReactMethod
  fun stopVpn(promise: Promise) {
    BackgroundTask(NativeModuleCallExceptionHandler {
      Toast.makeText(context, "error", Toast.LENGTH_SHORT).show()
    }) {
      try {
        VPN.instance.stopVpn { string  -> promise.resolve(string) }
      } catch (e: IllegalViewOperationException) {
        println(e.message)
      }
    }.execute()
  }

  @ReactMethod
  fun getCountries(promise: Promise) {
    BackgroundTask(NativeModuleCallExceptionHandler {
      Toast.makeText(context, "error", Toast.LENGTH_SHORT).show()
    }) {
      VPN.instance.getCounties { availableCountries ->
        val mapCountry: WritableMap = Arguments.createMap()
        availableCountries.countries.map { country: Country ->
          mapCountry.putInt(country.country, country.servers)
        }
        promise.resolve(mapCountry)
      }
    }.execute()
  }

  private class BackgroundTask
  internal constructor(exceptionHandler: NativeModuleCallExceptionHandler, callback :() -> Unit):
      GuardedAsyncTask<Void, Void>(exceptionHandler) {
    private var task: () -> Unit = callback

    override fun doInBackgroundGuarded(vararg params: Void) {
      task()
    }
  }
}