import axios from 'axios';
import config from '../config';

export default function getChartData(receivedPayload) {
  let chartData = {};

  if (receivedPayload === undefined) {
    chartData = {
      grade: 5,
      xAxis: 'racial',
    };
  } else {
    chartData = receivedPayload;
  }

  let url = `${config.api.domain}data?school_grade=${chartData.grade}&x=${chartData.xAxis}`;
  if (receivedPayload && receivedPayload.region) {
    url += `&region_id=${receivedPayload.region}`;
  }
  if (receivedPayload && receivedPayload.state) {
    url += `&state_id=${receivedPayload.state}`;
  }

  chartData.xAxis = chartData.xAxis;
  // xAxis = newXAxis;

  async function populateGlobalChartData() {
    try {
      const response = await axios.get(url);
      chartData.data = response.data.data;
      window.chartData = chartData;
      if (window.$vue.updateGlobalChartData) {
        window.$vue.globalChartData = chartData.data;
        window.$vue.updateGlobalChartData = false;
      }
    } catch (error) {
      window.console.error(error);
    }
  }

  return populateGlobalChartData();
}
