interface User {
    id: number;
    name: string;
    email: string;
}

export default async function ServerComponent() {
await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    const data = await fetch('https://jsonplaceholder.typicode.com/users/', { cache: 'no-store' });
        console.log('Fetched data:', data);
        const users: User[] = await data.json();
    return (
        <div>
            {users && users.map((user, index) => (
                <div key={index} className="mt-2 p-4 border rounded w-full max-w-md">
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-gray-700">{user?.email}</p>
                </div>
            ))}
            <h1>Server Component</h1>
            <p>This component is rendered on the server.</p>
        </div>
    );
}
