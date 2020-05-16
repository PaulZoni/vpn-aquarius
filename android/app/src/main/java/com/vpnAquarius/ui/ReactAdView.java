package com.vpnAquarius.ui;

import android.content.Context;

import com.facebook.react.views.view.ReactViewGroup;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;

public class ReactAdView extends ReactViewGroup {

  protected AdView adView;

  String adUnitID;
  String[] testDevices;
  AdSize adSize;

  public ReactAdView(final Context context) {
    super(context);
    this.createAdView();
  }

  private void createAdView() {
    if (this.adView != null) this.adView.destroy();

    final Context context = getContext();
    this.adView = new AdView(context);
    this.adView.setAdListener(new AdListener() {
      @Override
      public void onAdLoaded() {
        int width = adView.getAdSize().getWidthInPixels(context);
        int height = adView.getAdSize().getHeightInPixels(context);
        int left = adView.getLeft();
        int top = adView.getTop();
        adView.measure(width, height);
        adView.layout(left, top, left + width, top + height);
      }

      @Override
      public void onAdFailedToLoad(int errorCode) {

      }

      @Override
      public void onAdOpened() {
      }

      @Override
      public void onAdClosed() {
      }

      @Override
      public void onAdLeftApplication() {
      }
    });
    this.addView(this.adView);
  }

  public void loadBanner() {
    AdRequest.Builder adRequestBuilder = new AdRequest.Builder();
    if (testDevices != null) {
      for (int i = 0; i < testDevices.length; i++) {
        String testDevice = testDevices[i];
        if (testDevice == "SIMULATOR") {
          testDevice = AdRequest.DEVICE_ID_EMULATOR;
        }
        adRequestBuilder.addTestDevice(testDevice);
      }
    }
    AdRequest adRequest = adRequestBuilder.build();
    this.adView.loadAd(adRequest);
  }

  public void setAdUnitID(String adUnitID) {
    if (this.adUnitID != null) {
      // We can only set adUnitID once, so when it was previously set we have
      // to recreate the view
      this.createAdView();
    }
    this.adUnitID = adUnitID;
    this.adView.setAdUnitId(adUnitID);
  }

  public void setTestDevices(String[] testDevices) {
    this.testDevices = testDevices;
  }

  public void setAdSize(AdSize adSize) {
    this.adSize = adSize;
    this.adView.setAdSize(adSize);
  }
}