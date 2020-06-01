package com.vpnAquarius.ui.interstitialAd

import android.content.Context
import android.os.Handler
import android.os.Looper
import com.google.android.gms.ads.AdListener
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.InterstitialAd


class MyInterstitialAd private constructor() {
  private lateinit var mInterstitialAd: InterstitialAd
  companion object {
    val instance: MyInterstitialAd = MyInterstitialAd()
  }

  fun initMyInterstitialAd(c: Context) {
    // ca-app-pub-2335690523420671/5279684284 межстраничное объявление 1
    // ca-app-pub-3940256099942544/1033173712 межстраничное объявление 1 test
    mInterstitialAd = InterstitialAd(c)
    mInterstitialAd.adUnitId = "ca-app-pub-2335690523420671/5279684284"
    abListener()
  }

  fun show() {
    Handler(Looper.getMainLooper()).post {
      mInterstitialAd.loadAd(AdRequest.Builder().build())
    }
  }

  private fun abListener() {
    mInterstitialAd.setAdListener(object : AdListener() {
      override fun onAdLoaded() {
        mInterstitialAd.show()
      }
    })
  }
}
