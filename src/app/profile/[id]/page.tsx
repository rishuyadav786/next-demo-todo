// export default async function Profile({ params }: { params: { id: string } }) {
//   return (
//     <main className="flex  flex-col items-center justify-between p-24">
//       <h1 className="text-4xl font-bold">Welcome to the Profile Page</h1>
//       <p className="text-lg">Profile ID: {params.id}</p>
//     </main>
//   );
// }

export default async function Profile() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Profile Page</h1>
    </main>
  );
}