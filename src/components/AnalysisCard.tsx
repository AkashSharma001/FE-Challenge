import { Card, CardContent } from "@mui/joy";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import { AnalysisArray, AnalysisCardProps, BarData } from "../types/types";

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysisData }) => {

  const getFeatureList = (data: AnalysisArray) => {
    const featureListData = data.find(
      (item) => item.insight_name === "feature_list"
    );

    if (featureListData) {
      return featureListData.value as string[];
    }

    return [];
  };

  const filterNonFeatureList = (data: AnalysisArray): BarData[] => {
    const filterData = data.filter(
      (item) => item.insight_name !== "feature_list"
    );

    return filterData.map((d) => ({ origin: d.origin, ...d.value } as BarData));
  };

  const analysisValue: BarData[] = filterNonFeatureList(analysisData);

  const featureList: string[] = getFeatureList(analysisData);

  const formatToPercentage = (value: number) => {
    return `${(value !== null ? value * 100 : 0).toFixed(2)}%`;
  };

  return (
    <Card sx={{ overflowY: "hidden", margin: "5px" }}>

      <CardContent sx={{ width: "100%" }}>
      <div
            className={`h-[75vh]  min-w-[500px] overflow-y-hidden `}
          >
          <ResponsiveBar
            data={analysisValue}
            keys={featureList}
            indexBy="origin"
            margin={{
              top: 50,
              right: 150,
              bottom: 50,
              left: 65,
            }}
            padding={0.3}
            layout="horizontal"
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "SepalLengthCm",
                },
                id: "dots",
              },
              {
                match: {
                  id: "PetalLengthCm",
                },
                id: "lines",
              },
            ]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Percentage",
              legendPosition: "middle",
              legendOffset: 40,
              format: (value) => `${Math.round(value * 100)}%`,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Origins",
              legendPosition: "middle",
              legendOffset: -60,
              truncateTickAt: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            valueFormat={(d) => formatToPercentage(d)}
            enableGridX={true}
            role="Analysis"
            ariaLabel="Nivo bar chart demo"
            label={(d) => (d.value !== null ? formatToPercentage(d.value) : "")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

