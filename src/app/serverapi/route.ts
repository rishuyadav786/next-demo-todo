// src/app/serverapi/route.ts
import { NextResponse } from "next/server";
// import ddbDocClient from "@/lib/dynamoClient";
import ddbDocClient from "../../lib/dynamoClient";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
// Handle GET request
export async function GET() {
    // --- START DEBUG LOGGING ---
    console.log("--- Verifying Environment Variables in API Route ---");
    console.log("AWS_REGION:", process.env.REGION);
    console.log("AWS_ACCESS_KEY_ID:", process.env.ACCESS_KEY_ID ? "Loaded" : "NOT LOADED");
    console.log("AWS_SECRET_ACCESS_KEY:", process.env.SECRET_ACCESS_KEY ? "Loaded" : "NOT LOADED");
    console.log("AWS_SESSION_TOKEN:", process.env.SESSION_TOKEN ? "Loaded" : "NOT LOADED");
    console.log("----------------------------------------------------");
    // --- END DEBUG LOGGING ---

    try {
        // const data = await ddbDocClient.send(
        //   new GetCommand({
        //     TableName: "Todos",
        //     Key: { id: "fac06ae3-82fb-45bc-8816-85964ce89b2a", email: "rishuyadav@gmail.com" },
        //   })
        // );
        // // const data = await ddbDocClient.send(new ScanCommand({ TableName: "Todos" }));
        // return NextResponse.json(data.Item ?? {});



        const data = await ddbDocClient.send(new ScanCommand({ TableName: "Todos" }));

        //   const todos = data.Items || [];
        return NextResponse.json(data.Items ?? {});
        //   return { statusCode: 200, headers, body: JSON.stringify(todos) };


    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// Handle POST request
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const id = crypto.randomUUID();
        body.id = id; // Assign the generated UUID to the id field
        await ddbDocClient.send(
            new PutCommand({
                TableName: "Todos",
                Item: body,
            })
        );

        return NextResponse.json({ message: "User added" }, { status: 201 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

