'use client';
import React,{useEffect} from 'react';
export default function Dashboard() {
const [data, setData] = React.useState([{id:"", text:""}]);
const api=process.env.BASE_API;
    useEffect(() => {
        // Fetch data or perform any side effects here
        console.log("Dashboard component rendered");
        fetch(api+"api")
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
      {data?.map((item, index) => (
        <div key={index} className="mt-2 p-4 border rounded w-full max-w-md">
          <h3 className="text-xl font-bold">{item?.id}</h3>
            <p className="text-gray-700">{item?.text}</p>
        </div>
        ))}
      {/* {data && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Fetched Data:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )} */}
      {/* {data && ( data.map((item, index) => (
        <div key={index} className="mt-2 p-4 border rounded w-full max-w-md">
          <h3 className="text-xl font-bold">{item.title}</h3>   
            <p className="text-gray-700">{item.body}</p>
      </div>
      )))} */}

    </main>
  );

}
