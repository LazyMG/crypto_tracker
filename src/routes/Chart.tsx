import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { Helmet } from "react-helmet-async";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close],
    };
  });

  return (
    <div>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      {isLoading ? (
        "Loading chart..."
      ) : (
        // <ApexCharts
        //   type="line"
        //   series={[
        //     {
        //       name: "price",
        //       data: data?.map((price) => Number(price.close)) as number[],
        //     },
        //   ]}
        //   options={{
        //     theme: { mode: "dark" },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: "transparent",
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: "smooth",
        //       width: 4,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) =>
        //         new Date(price.time_close * 1000).toISOString()
        //       ),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
        // <ApexCharts
        //   type="candlestick"
        //   series={[
        //     {
        //       name: "price",
        //       // data: data?.map((price) => Number(price.close)) as number[],
        //       data: chartData,
        //     },
        //   ]}
        //   options={{
        //     chart: {
        //       type: "candlestick",
        //       height: 350,
        //     },
        //     title: {
        //       text: "CandleStick Chart",
        //       align: "left",
        //     },
        //     xaxis: {
        //       type: "datetime",
        //     },
        //     yaxis: {
        //       tooltip: {
        //         enabled: false,
        //       },
        //     },
        //   }}
        // />
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "price",
              data: chartData,
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
