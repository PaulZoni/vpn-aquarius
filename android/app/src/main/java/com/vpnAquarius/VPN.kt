package com.vpnAquarius

import android.util.Log
import com.anchorfree.partner.api.ClientInfo
import com.anchorfree.partner.api.auth.AuthMethod
import com.anchorfree.partner.api.response.AvailableCountries
import com.anchorfree.partner.api.response.User
import com.anchorfree.reporting.TrackingConstants
import com.anchorfree.sdk.NotificationConfig
import com.anchorfree.sdk.SessionConfig
import com.anchorfree.sdk.UnifiedSDK
import com.anchorfree.sdk.UnifiedSDKConfig
import com.anchorfree.vpnsdk.callbacks.Callback
import com.anchorfree.vpnsdk.callbacks.CompletableCallback
import com.anchorfree.vpnsdk.callbacks.VpnStateListener
import com.anchorfree.vpnsdk.exceptions.VpnException
import com.anchorfree.vpnsdk.transporthydra.HydraTransport
import com.anchorfree.vpnsdk.vpnservice.VPNState

class VPN private constructor() {
  private var unifiedSDK: UnifiedSDK? = null
  companion object {
    val instance: VPN = VPN()
  }

  init {
    initHydraSdk()
  }

  private fun initHydraSdk() {
    val clientInfo = ClientInfo.newBuilder()
      .baseUrl("https://backend.northghost.com")
      .carrierId("31415_31415926")
      .build()
    val config = UnifiedSDKConfig.newBuilder().idfaEnabled(false).build()
    unifiedSDK = UnifiedSDK.getInstance(clientInfo, config)
    val notificationConfig = NotificationConfig.newBuilder()
      .title("vpn")
      .channelId("vpn")
      .build()
    UnifiedSDK.update(notificationConfig)
    UnifiedSDK.setLoggingLevel(Log.VERBOSE)
  }

  fun login(callback: (string: String) -> Unit) {
    val authMethod = AuthMethod.anonymous()
      unifiedSDK
      ?.backend
      ?.login(authMethod, object: Callback<User> {
        override fun success(p0: User) {
          callback("login")
        }
        override fun failure(p0: VpnException) {
          callback("login error")
        }
      })
  }

  fun logout(callback: (string: String) -> Unit) {
    unifiedSDK
      ?.backend
      ?.logout(object: CompletableCallback {
        override fun complete() {
          callback("logout")
        }

        override fun error(p0: VpnException) {}
      })
  }

  fun startVpn(callback: (string: String) -> Unit) {
    val defaultSession = SessionConfig.Builder()
      .withReason(TrackingConstants.GprReasons.M_UI)
      .withTransport(HydraTransport.TRANSPORT_ID)
      .withVirtualLocation(UnifiedSDK.COUNTRY_OPTIMAL)
      .build()

    UnifiedSDK.getInstance()
      .vpn
      .start(defaultSession, object: CompletableCallback {
        override fun complete() {
          callback("connect")
        }

        override fun error(p0: VpnException) {
          callback("connect error")
        }
      })
  }

  fun startVpn(country: String, callback: (string: String) -> Unit) {
    val session = SessionConfig.Builder()
      .withReason(TrackingConstants.GprReasons.M_UI)
      .withTransport(HydraTransport.TRANSPORT_ID)
      .withVirtualLocation(country)
      .build()

    UnifiedSDK.getInstance()
      .vpn
      .start(session, object: CompletableCallback {
        override fun complete() {
          callback("connect")
        }

        override fun error(p0: VpnException) {
          callback("connect error")
        }
      })
  }

  fun stopVpn(callback: (string: String) -> Unit) {
    UnifiedSDK.getInstance()
      .vpn
      .stop(TrackingConstants.GprReasons.M_UI, object : CompletableCallback {
      override fun complete() {
        callback("stop vpn")
      }

      override fun error(e: VpnException) {
        callback("stop vpn error")
      }
    })
  }

  fun restartVpn(selectCountry: String, callback: (string: String) -> Unit) {
    val defaultSession = SessionConfig.Builder()
      .withVirtualLocation(selectCountry)
      .withReason(TrackingConstants.GprReasons.M_UI)
      .build()

    UnifiedSDK.getInstance()
      .vpn
      .restart(defaultSession, object: CompletableCallback {
      override fun complete() {
        callback("connect")
      }

      override fun error(p0: VpnException) {
        callback("connect error")
      }
    })
  }

  fun stateListener(callback: (string: String) -> Unit) {
    UnifiedSDK.addVpnStateListener(object : VpnStateListener {
      override fun vpnStateChanged(vpnState: VPNState) {
        callback(vpnState.name)
      }

      override fun vpnError(e: VpnException) {
        callback(e.toTrackerName())
      }
    })
  }

  fun trafficListener(callback: (rx: Long, tx: Long) -> Unit) {
    UnifiedSDK.addTrafficListener { rx, tx -> callback(rx, tx) }
  }

  fun getVpnState(callback: (state: VPNState) -> Unit) {
    UnifiedSDK.getVpnState(object: Callback<VPNState> {
      override fun success(p0: VPNState) {
        callback(p0)
      }

      override fun failure(p0: VpnException) {}
    })
  }

  fun getCounties(callback: (availableCountries: AvailableCountries) -> Unit) {
    UnifiedSDK.getInstance().backend.countries(object: Callback<AvailableCountries> {
      override fun success(p0: AvailableCountries) {
        callback(p0)
      }

      override fun failure(p0: VpnException) {}
    })
  }
}

