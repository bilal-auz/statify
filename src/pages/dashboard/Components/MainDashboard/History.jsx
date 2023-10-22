import React, { useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { fetchRecentlyPlayedTracks } from "../../../../services/DataFetchService";
import { getPlayedMinutesOfEachDay } from "../../../../helper/helpers";

function History() {
  const [chartData, setchartData] = useState(undefined);

  useEffect(() => {
    getMinutesPlayedEachDay();
  }, []);

  const setupChart = (dataTimed) => {
    const data = dataTimed.map((track, index) => {
      return {
        name: "track " + index,
        minutes: track.minutes,
        seconds: track.seconds,
        date: track.date.getDate() + "/" + track.date.getMonth(),
      };
    });
    console.log(data);
    setchartData(data);
  };

  const getMinutesPlayedEachDay = async () => {
    const data = await fetchRecentlyPlayedTracks(50, false);

    const dataTimed = getPlayedMinutesOfEachDay(data);

    dataTimed.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA - dateB;
    });

    setupChart(dataTimed);
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 flex flex-col items-start px-2 py-3 rounded">
          <p className="text-base font-s_white font-[spotify-txtBook]">{`${label}`}</p>
          <p className="text-base font-s_white font-[spotify-txtBook]">
            Time Listened: {payload[0].payload.minutes}m
            {payload[0].payload.seconds}s
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="mt-5">
      <h3 className="text-start ml-5 font-[spotify-bold]">
        Minutes Listened{" "}
        <span className="text-sm text-gray-400">
          -limited to latest 50 tracks-
        </span>
      </h3>
      <div className="bg-[#19191b] p-7 relative rounded-lg">
        <div id="chart">
          <LineChart
            width={1100}
            height={250}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="2" />
            <XAxis tick={{ fontSize: "15px" }} dataKey="date" />
            <YAxis
              tick={{ fontSize: "15px" }}
              domain={[
                (dataMin) => 0 - Math.abs(dataMin),
                (dataMax) => Math.ceil((dataMax * 1.1) / 5) * 5,
              ]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#1DB954"
              strokeWidth={3}
            />
          </LineChart>
        </div>
        <div className="mt-7">
          <ul className=""></ul>
        </div>
      </div>
    </div>
  );
}

export default History;
