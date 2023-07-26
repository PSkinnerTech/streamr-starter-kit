import React, { useEffect, useState } from "react";
import main from "../StreamrClient";

interface Data {
  data: any;
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const handleData = (data: Data) => {
      console.log("Received message:", data);
      setData(data);
    };
    main(handleData);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-4">
        Streamr Starter Kit
      </h1>
      {data && (
        <div>
          <h3 className="text-xl font-bold mb-2 text-center">Data Stream</h3>
          <p className="text-center">
            Data: {JSON.stringify(data.data, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
}
