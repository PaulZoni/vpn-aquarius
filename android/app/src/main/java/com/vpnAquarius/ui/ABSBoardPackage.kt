package com.vpnAquarius.ui

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import java.util.*

class ABSBoardPackage : ReactPackage {

  override fun createNativeModules(
    reactContext: ReactApplicationContext
  ): MutableList<NativeModule> = Collections.emptyList()

  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ): MutableList<ABSBoard>  {
    return mutableListOf(ABSBoard())
  }
}