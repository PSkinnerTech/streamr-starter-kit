import React, { useEffect, useState } from "react";
import main from "../StreamrClient";

interface StreamrData {
  data: {
    ambientTemp: number;
    latitude: number;
    longitude: number;
  };
}

export default function Home() {
  const [streamrData, setStreamrData] = useState<StreamrData | null>(null);

  useEffect(() => {
    const handleData = (data: StreamrData) => {
      console.log("Received message:", data);
      setStreamrData(data);
    };
    main(handleData);
  }, []);

  useEffect(() => {
    console.log(streamrData);
  }, [streamrData]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-4">
        DIMO Streamr Data Stream Demo
      </h1>
      {streamrData && (
        <div className="flex justify-around">
          <div>
            <h3 className="text-xl font-bold mb-2 text-center">Data Stream</h3>
            {Object.keys(streamrData.data).map((key, index) => (
              <p key={index} className="text-center">
                {key}: {streamrData.data[key as keyof StreamrData["data"]]}
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-center">
              Data Variables
            </h3>
            {Object.keys(streamrData.data).map((key, index) => (
              <p key={index} className="text-center">
                {key}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
