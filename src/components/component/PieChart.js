import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  return (
    <div
      className="col-12 padding0 chart-container"
      style={{
        height: "450px",
        width: "100%",
        position: "relative",
      }}
    >
      <ResponsivePie
        data={data}
        margin={{ top: 8, right: 20, bottom: 8, left: 20 }}
        innerRadius={0.65}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default PieChart;
