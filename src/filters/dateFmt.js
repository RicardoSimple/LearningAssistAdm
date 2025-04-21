import Vue from 'vue'

// 日期格式化
import { formatDate } from '@/utils/date'

Vue.filter('dateFmt', function (value, format) {
  return formatDate(value, format)
})
