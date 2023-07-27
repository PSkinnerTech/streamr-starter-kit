import { useEffect, useState } from "react";
import subscribeToStream from "../StreamrClient";

interface StreamrData {
  data: any;
}

export default function Home() {
  const [streamrData, setStreamrData] = useState<StreamrData | null>(null);
  const [streamrDataHistory, setStreamrDataHistory] = useState<StreamrData[]>(
    []
  );
  const [streamId, setStreamId] = useState<string>(
    "streams.dimo.eth/firehose/weather"
  );

  useEffect(() => {
    subscribeToStream(streamId, (data: any) => {
      setStreamrData(data);
      setStreamrDataHistory((prevData) => {
        const newData = [...prevData, data];
        // If the length of the data stream is more than 100, remove the oldest data
        if (newData.length > 100) {
          newData.shift();
        }
        return newData;
      });
    });
  }, [streamId]);

  const handleStreamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStreamId(event.target.value);
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl pb-1">Select Stream</h2>
      <select value={streamId} onChange={handleStreamChange} className="mb-5">
        <option
          value="streams.dimo.eth/firehose/weather"
          className="text-black"
        >
          Weather Stream
        </option>
        <option
          value="streamr.eth/metrics/nodes/firehose/sec"
          className="text-black"
        >
          Node Metrics Stream
        </option>
      </select>
      <div className="flex justify-between px-10">
        {" "}
        {/* 2.5% padding on the left and right side */}
        <div className="w-2/5 border border-white rounded p-2">
          {" "}
          {/* 40% width for the box */}
          <h2 className="text-4xl pb-1 border-b-2 border-white">Data Stream</h2>
          <pre className="overflow-auto">
            {JSON.stringify(streamrData, null, 2)}
          </pre>{" "}
          {/* Text wrapping */}
        </div>
        <div className="w-1/10"></div> {/* 5% padding between the boxes */}
        <div className="w-2/5 border border-white rounded p-2">
          {" "}
          {/* 40% width for the box */}
          <h2 className="text-4xl pb-1 border-b-2 border-white">
            Data Variables
          </h2>
          {streamrData && streamrData.data && (
            <pre className="overflow-auto">
              {Object.keys(streamrData.data).join("\n")}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
