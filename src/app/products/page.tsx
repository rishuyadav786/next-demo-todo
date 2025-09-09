'use client';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Suspense } from 'react';
import {Products} from '@/components/Products';
import {Reviews} from '@/components/Reviews';
export default function Dashboard() {
const [data, setData] = React.useState([{id:"", email:"", task:""}]);
 const [inputData, setInputData] = useState({
        task: '',
        email: 'rishuyadav@gmail.com', // Default email, will be updated on mount
        currentTime: new Date().toLocaleTimeString(),
        dueDate: new Date().toISOString().split('T')[0], // Default to today's date
        priority: 'low', // Default priority
        completed: false
    });
const API="http://localhost:3000/serverapi"
    useEffect(() => {
        // This code runs only on the client, after the component has mounted.
        const storedEmail = localStorage.getItem('todoEmail');
        if (storedEmail) {
            setInputData(prevData => ({ ...prevData, email: storedEmail }));
        }

        // Fetch data or perform any side effects here
        console.log("Dashboard component rendered");
        fetch(API)
          .then(response => response.json())
          .then(data => { 
            console.log("Fetched data:", data);
            if(data?.error){
                console.error(data.error);
                setData([]);
            } else {
                setData(data);
            }
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);


      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // api.post(myUrl, inputData)
        axios.post(`${API}`,  inputData )
            .then(res => {
                alert("Todo added Successfully");
                console.log("Response data:", res.data);
                // Option 1: Add the new todo to the list immediately (optimistic update)
                // if (onTodoAdded && res.data) {
                //     onTodoAdded(res.data);
                // }
                
                // Option 2: Trigger a refresh of the todo list
                // if (onRefresh) {
                //     onRefresh();
                // }
                
                // Clear the input
                setInputData({
                    task: '',
                    email: localStorage.getItem('todoEmail') || '',
                    currentTime: new Date().toLocaleTimeString(),
                    dueDate: new Date().toISOString().split('T')[0],
                    priority: 'low',
                    completed: false
                });
                
                // Navigate to home (this will also trigger a re-render)
                // navigate("/");
            })
            .catch(err => {
                alert("Something went Wrong..!");
                console.error("Error adding todo:", err);
            });
    };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Product Reviews</h1>
        <Suspense fallback={<div>Loading Product...</div>}>
            <Products />
        </Suspense>
          <Suspense fallback={<div>Loading Reviews...</div>}>
            <Reviews />
        </Suspense>

      <h1 className="text-4xl font-bold">Welcome to the Todo Lists</h1>
   <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="hidden" value={inputData.email} />
                    <input 
                        type="text" 
                        className="form-control" 
                        id="todo" 
                        placeholder="Add a new task..."
                        value={inputData.task}
                        onChange={e => { setInputData({ ...inputData, task: e.target.value }) }} 
                        aria-label="Add a new task" 
                        aria-describedby="basic-addon2" 
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">+</button>
                    </div>
                </div>
            </form>
      {data && data?.map((user, index) => (
        <div key={index} className="mt-2 p-4 border rounded w-full max-w-md">
          <h3 className="text-xl font-bold">{user?.email}</h3>
            <p className="text-gray-700">{user?.task}</p>
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