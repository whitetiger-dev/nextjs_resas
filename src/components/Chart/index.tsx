import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts, { SeriesLineOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { selectPopulation } from '@/store';
import { dashStyles } from '@/constants';
import { PopulationInfo } from '@/constants/types';

export default function Chart() {
  const { populationInfos, generation, prefectures } =
    useSelector(selectPopulation);

  // map関数をuseCallbackでメモ化し、レンダリングの最適化を行います。
  const mapPopulationInfoToChartData = useCallback(
    (info: PopulationInfo, index: number): SeriesLineOptions => {
      const prefName = prefectures.find(
        (prefecture) => prefecture.prefCode === info.prefCode,
      )?.prefName;
      const dataValues = info.data
        .find((data) => data.label === generation)
        ?.data.map((item) => item.value);

      return {
        type: 'line',
        name: prefName,
        data: dataValues,
        dashStyle: dashStyles[index % dashStyles.length],
      };
    },
    [prefectures, generation],
  );

  // chartOptionsをuseMemoでメモ化し、レンダリングの最適化を行います。
  const chartOptions = useMemo(() => {
    const yearCategories =
      populationInfos[0]?.data[0].data.map((item) => item.year.toString()) ||
      [];
    const chartData = populationInfos.map(mapPopulationInfoToChartData);

    const options: Highcharts.Options = {
      title: {
        text: '人口統計資料',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: yearCategories,
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      accessibility: {
        enabled: false,
      },
      series: chartData,

      // レスポンシブ設定
      responsive: {
        rules: [
          {
            // このルールでは、ビューポートが768px以下の場合に適用されます。
            condition: {
              maxWidth: 768,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };

    return options;
  }, [populationInfos, mapPopulationInfoToChartData]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
