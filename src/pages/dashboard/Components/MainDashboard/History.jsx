import React, { useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchRecentlyPlayedTracks } from "../../../../services/DataFetchService";
import { getPlayedMinutesOfEachDay, timeAgo } from "../../../../helper/helpers";

function History() {
  const [chartData, setchartData] = useState(undefined);
  const [historyList, setHistoryList] = useState(undefined);
  const [showNum, setShowNum] = useState(15);
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
    setHistoryList(data);

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
    <div id="history" className="mt-5">
      <h3 className="text-start ml-5 font-[spotify-bold]">
        Minutes Listened{" "}
        <span className="text-sm text-gray-400">
          -limited: latest 50 tracks-
        </span>
      </h3>
      <div className="bg-[#19191b] py-7 px-5 relative rounded-lg pb-2 w-full xl:p-7">
        <div className="flex justify-start bg-white-500 xl:justify-center">
          <ResponsiveContainer height={250} width="95%">
            <LineChart
              data={chartData}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="2" />
              <XAxis tick={{ fontSize: "15px" }} dataKey="date" />
              <YAxis
                tick={{ fontSize: "15px" }}
                domain={[
                  (dataMin) => 0 - Math.abs(dataMin),
                  (dataMax) => Math.ceil((dataMax * 1.1) / 5) * 5,
                ]}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#1DB954"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-7 flex flex-col justify-center">
          <ul className="">
            {historyList &&
              historyList.items.slice(0, showNum).map((track, index) => (
                <li className="flex flex-row text-start items-center mb-5 relative w-full">
                  <p className="w-5 text-base text-gray-500 font-bold">
                    {index + 1}
                  </p>
                  <div className="mr-5">
                    <img
                      className="w-12 rounded"
                      src={track.track.album.images[2].url}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 pt-1.5 flex justify-between space-x-4">
                    <div className="">
                      <p className="text-lg font-[spotify-mid]">
                        {track.track.name}
                      </p>
                      <p className="text-sm text-gray-500 font-[spotify-txtBook]">
                        {track.track.artists[0].name}
                      </p>
                    </div>
                    <p className="text-base text-gray-500 whitespace-nowrap">
                      {timeAgo(track.played_at)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <button
          className="text-sm text-gray-500"
          onClick={() => {
            if (showNum > 15) {
              setShowNum(15);
              window.location = "#history";
            } else {
              setShowNum(50);
            }
          }}
        >
          {showNum > 15 ? "show less" : "show more"}
        </button>
      </div>
    </div>
  );
}

export default History;
