import type {Ref} from 'vue'; // 写不写type都可以
import {onBeforeUnmount, onMounted, ref,markRaw} from 'vue';
import * as echarts from 'echarts';

export function useChart(chartRef:Ref<HTMLElement|null>,initialOptions:any){
    const chartInstance = ref<echarts.ECharts|null>(null);
    const chartOptions = ref(initialOptions);

    const initChart = () => {
        if(chartRef.value){
            // 初始化实例
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            chartInstance.value.setOption(chartOptions.value);
        }
    }

    const resizeChart =  () => {
        chartInstance.value?.resize();
    }

    onMounted(()=>{
        initChart();
        window.addEventListener("resize", resizeChart);
    })

    onBeforeUnmount(()=>{
        window.removeEventListener("resize", resizeChart);
        // 释放图表能占用的资源：图表实例
        if(chartInstance.value){
            // 如果图表实例还在，释放图表所占用的资源
            chartInstance.value.dispose(); 
        }
    })

}