// // pages/api/users.js
// import ddbDocClient from "@/lib/dynamoClient";
// import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const data = await ddbDocClient.send(
//         new GetCommand({
//           TableName: "Users",
//           Key: { userId: "123" },
//         })
//       );
//       res.status(200).json(data.Item);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }

//   if (req.method === "POST") {
//     try {
//       const body = JSON.parse(req.body);
//       await ddbDocClient.send(
//         new PutCommand({
//           TableName: "Users",
//           Item: body,
//         })
//       );
//       res.status(201).json({ message: "User added" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// }
