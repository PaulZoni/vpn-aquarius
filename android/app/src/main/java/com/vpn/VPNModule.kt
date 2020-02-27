package com.vpn

import android.os.Handler
import android.os.Looper
import android.os.Message
import android.widget.Toast
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.IllegalViewOperationException
import com.facebook.react.bridge.GuardedAsyncTask


class VPNModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
  private var context: ReactApplicationContext? = context
  private var handler: Handler? = null
  private var promiseSave: Promise? = null

  override fun getName(): String {
    return "VPNModule"
  }


  init {
    handler = object: Handler(Looper.getMainLooper()) {
      override fun handleMessage(msg: Message?) {
       promiseSave?.resolve(msg?.obj)
      }
    }
  }

  @ReactMethod
  fun startVpn(promise: Promise) {
    try {
      VPN.instance.startVpn { string ->
        promise.resolve(string)
        Toast.makeText(context, "toast", Toast.LENGTH_LONG).show()
      }
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

  @ReactMethod
  fun getCountries(promise: Promise) {

/*    object : GuardedAsyncTask<Void, Void>(NativeModuleCallExceptionHandler {

    }) {
      override fun doInBackgroundGuarded(vararg params: Void) {
        VPN.instance.getCounties { availableCountries ->
          Toast.makeText(context, availableCountries.countries.get(4).country, Toast.LENGTH_SHORT).show()
          promise.resolve(availableCountries.countries.get(4).country)
        }
      }
    }.execute()*/


    BackgroundTask(NativeModuleCallExceptionHandler {
      Toast.makeText(context, "error", Toast.LENGTH_SHORT).show()
    }) {
      VPN.instance.getCounties { availableCountries ->
        promise.resolve(availableCountries.countries.get(4).country)
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