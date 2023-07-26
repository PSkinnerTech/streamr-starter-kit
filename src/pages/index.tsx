import { useEffect, useState } from "react";
import StreamrClient from "../StreamrClient";

interface StreamrData {
  data: any;
}

export default function Home() {
  const [streamrData, setStreamrData] = useState<StreamrData | null>(null);
  const [streamId, setStreamId] = useState("streams.dimo.eth/firehose/weather"); // Default streamId

  useEffect(() => {
    StreamrClient(streamId, (data: StreamrData) => {
      setStreamrData(data);
    });
  }, [streamId]);

  const handleStreamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStreamId(event.target.value);
  };

  return (
    <div className="p-5">
      <h2>Select Stream</h2>
      <select value={streamId} onChange={handleStreamChange} className="mb-5">
        <option value="streams.dimo.eth/firehose/weather">
          Weather Stream
        </option>
        <option value="streamr.eth/metrics/nodes/firehose/sec">
          Node Metrics Stream
        </option>
      </select>
      <div className="flex justify-between">
        <div className="w-2/5 border border-white rounded p-2">
          <h2 className="text-2xl underline-offset-1">Data Stream</h2>
          <pre>{JSON.stringify(streamrData, null, 2)}</pre>
        </div>
        <div className="w-2/5 border border-white rounded p-2">
          <h2 className="text-2xl underline-offset-1">Data Variables</h2>
          {streamrData && <pre>{Object.keys(streamrData.data).join("\n")}</pre>}
        </div>
      </div>
    </div>
  );
}
