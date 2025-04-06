import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  AxisPointerComponent,
  ToolboxComponent,
  VisualMapComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
>

// 统一注册组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  AxisPointerComponent,
  ToolboxComponent,
  VisualMapComponent,
  GridComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  CanvasRenderer
])

export default echarts // 导出配置好的实例
