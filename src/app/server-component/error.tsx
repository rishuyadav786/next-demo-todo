"use client";
import React ,{useEffect}from 'react';
export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("An error occurred");
    }, [error]);

    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-lg">Something went wrong...</p>
        </div>
    );
}
