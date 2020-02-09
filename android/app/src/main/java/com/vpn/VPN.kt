package com.vpn

import android.util.Log
import com.anchorfree.partner.api.ClientInfo
import com.anchorfree.partner.api.auth.AuthMethod
import com.anchorfree.partner.api.response.User
import com.anchorfree.reporting.TrackingConstants
import com.anchorfree.sdk.NotificationConfig
import com.anchorfree.sdk.SessionConfig
import com.anchorfree.sdk.UnifiedSDK
import com.anchorfree.sdk.UnifiedSDKConfig
import com.anchorfree.sdk.rules.TrafficRule
import com.anchorfree.vpnsdk.callbacks.Callback
import com.anchorfree.vpnsdk.callbacks.CompletableCallback
import com.anchorfree.vpnsdk.exceptions.VpnException
import com.anchorfree.vpnsdk.vpnservice.VPNState
import com.anchorfree.vpnsdk.callbacks.VpnStateListener

class VPN private constructor() {
  private var unifiedSDK: UnifiedSDK? = null
  private val defaultSession = SessionConfig.Builder()
    .withVirtualLocation(UnifiedSDK.COUNTRY_OPTIMAL)
    .withReason(TrackingConstants.GprReasons.M_UI)
    .addDnsRule(TrafficRule.Builder.bypass().fromDomains(arrayListOf("*facebook.com", "*wtfismyip.com")))
    .build()

  companion object {
    val instance: VPN = VPN()
  }

  init {
    initHydraSdk()
  }

  private fun initHydraSdk() {
    val clientInfo = ClientInfo.newBuilder()
      .baseUrl("https://backend.northghost.com")
      .carrierId("31415")
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
    unifiedSDK
      ?.vpn
      ?.start(defaultSession, object: CompletableCallback {
        override fun complete() {
          callback("connect")
        }

        override fun error(p0: VpnException) {
          callback("connect error")
        }
      })
  }

  fun stopVpn(callback: (string: String) -> Unit) {
    unifiedSDK
      ?.vpn
      ?.stop(TrackingConstants.GprReasons.M_UI, object : CompletableCallback {
      override fun complete() {
        callback("stop vpn")
      }

      override fun error(e: VpnException) {
        callback("stop vpn error")
      }
    })
  }

  fun restartVpn(callback: (string: String) -> Unit) {
    unifiedSDK
      ?.vpn
      ?.restart(defaultSession, object: CompletableCallback {
      override fun complete() {
        callback("connect")
      }

      override fun error(p0: VpnException) {
        callback("connect error")
      }
    })
  }

  fun trafficListener(callback: (string: String) -> Unit) {
    UnifiedSDK.addVpnStateListener(object : VpnStateListener {
      override fun vpnStateChanged(vpnState: VPNState) {
        callback(vpnState.name)
      }

      override fun vpnError(e: VpnException) {
        callback(e.toTrackerName())
      }
    })
  }

  fun remainingTraffic(callback: (rx: Long, tx: Long) -> Unit) {
    UnifiedSDK.addTrafficListener { rx, tx -> callback(rx, tx) }
  }
}

