package com.vpnAquarius.ui

import android.graphics.Color
import androidx.core.content.ContextCompat
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.components.YAxis
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.vpnAquarius.R
import com.vpnAquarius.VPN
import java.math.BigDecimal
import java.math.RoundingMode
import java.util.*

class ReactChartManager: SimpleViewManager<LineChart>() {
  private var entries: MutableList<Entry> = ArrayList()
  private var count: Float = 0.0F

  override fun createViewInstance(reactContext: ThemedReactContext): LineChart {
    var chart = LineChart(reactContext)

    var xAxis = chart.xAxis
    xAxis.position = XAxis.XAxisPosition.TOP
    xAxis.textSize = 10f
    xAxis.setDrawAxisLine(false)
    xAxis.setDrawGridLines(false)
    xAxis.setEnabled(false)
    xAxis.setDrawAxisLine(false)
    xAxis.setDrawGridLines(false)
    xAxis.setDrawLabels(false)

    var yAxis: YAxis = chart.getAxisLeft()
    yAxis.setLabelCount(12, false)
    yAxis.setPosition(YAxis.YAxisLabelPosition.INSIDE_CHART);
    yAxis.setDrawGridLines(false)

    var leftAxis = chart.axisLeft
    leftAxis.setDrawGridLines(false)
    leftAxis.setDrawLabels(false); // no axis labels
    leftAxis.setDrawAxisLine(false); // no axis line
    leftAxis.setDrawGridLines(false); // no grid lines
    leftAxis.setDrawZeroLine(false); // draw a zero line

    chart.setViewPortOffsets(0f, 20f, 0f, 0f)
    chart.animateXY(2000, 2000)
    chart.getAxisRight().setEnabled(false)
    chart.getLegend().setEnabled(false)
    chart.getDescription().setEnabled(false)
    chart.invalidate()

    VPN.instance.trafficListener { rx, tx ->
      entries.add(Entry(count++, BigDecimal((tx.toDouble() / 1024) / 1024).setScale(2, RoundingMode.HALF_EVEN).toFloat()))
      val lineDataSet = LineDataSet(entries, null)
      lineDataSet.setMode(LineDataSet.Mode.CUBIC_BEZIER)
      lineDataSet.setDrawValues(false)
      lineDataSet.setCircleRadius(10f)
      lineDataSet.color = Color.BLUE
      lineDataSet.lineWidth = .0f
      lineDataSet.setDrawCircles(false)
      lineDataSet.setDrawFilled(true)
      lineDataSet.fillDrawable = ContextCompat.getDrawable(reactContext, R.drawable.fade_red)
      chart.data = LineData(lineDataSet)
      chart.invalidate()
    }

    return chart
  }

  fun readLine() {

  }

  override fun getName(): String {
    return "RCTLinerChart"
  }
}