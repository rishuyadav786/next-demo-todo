// lib/dynamoClient.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.APP_AWS_REGION || "us-east-1";
const ACCESS_KEY = process.env.APP_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.APP_AWS_SECRET_ACCESS_KEY;
const SESSION_TOKEN = process.env.APP_AWS_SESSION_TOKEN;

// Add this logging to debug
console.log("AWS Region:", REGION);
console.log("AWS Access Key ID:", ACCESS_KEY ? `${ACCESS_KEY.substring(0, 4)}...` : "Not Found");
console.log("AWS Session Token:", SESSION_TOKEN ? "Found" : "Not Found");

if (!ACCESS_KEY || !SECRET_KEY) {
  throw new Error(
    "AWS credentials (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY) are not set in environment variables."
  );
}

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    sessionToken: SESSION_TOKEN, // Pass the session token
  },
});

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export default ddbDocClient;


