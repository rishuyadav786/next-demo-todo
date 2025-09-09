// lib/dynamoClient.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.APP_AWS_REGION || "us-east-1";
const ACCESS_KEY = process.env.APP_AWS_ACCESS_KEY_ID || "ASIA2CUNLUJZAXPI3PYO";
const SECRET_KEY = process.env.APP_AWS_SECRET_ACCESS_KEY || "Qd94b45aB03NlfggZvd2ya5hppKu96eBKUYdgdgW";
const SESSION_TOKEN = process.env.APP_AWS_SESSION_TOKEN || "IQoJb3JpZ2luX2VjEHMaCXVzLWVhc3QtMSJHMEUCIQCW2GNvoXCAu0RSiht5oFNjWrBp2E3XYL8WPj25993aAQIgVLGVOQXaKGvaftVW5sc7Wqcm7w4iA3IfjBrAlxXDHzkqmgMI3P//////////ARAAGgw2OTI4NTk5MzczOTQiDBFdgfZmQb67rwbCxiruArqcY5GWuwo1Gk//owoukBpXau2ZC3v34B/SSUUBrl4BMK2+LwocJ1DZpYn9wacbMB4ET3WirYEd9GKL2tExgbW/JRGRWQNgJlFkqHFRXOzAJZxEM+LieNB3FxYZ99uHcD3i9AzeCzvN3Yes/9Bhnv4HfSy5aLTRCG55RpYjCezniHATqzsjOGhuBmuYuj4BUuVur3kDpQqoezmOf0B9eCyIe9U63YCKMQyztx+gZMOAbzaJSr5SzG9O6EqNCtSEKizMVZQFNGJ9FhgzN+jK9WC3PPRzhiKEn8/xAmnf41aytu5P2F20Z4f81llr3X9xc9zEVbTuf+UMHQ72HJ+LxMWZsVUEOPbjAiu1rb8YcXQ8tVPUojAhxVE/fAyX23THSpTc7o7/UGuhJQBW5+eQLflJMkv9hAzwY03C8f3XuEBOixkVkvNKyqfrl7Zg3qb4cKR4v93dNeun1wShsITcG8SK/jBOaSc6CyBayWxO1zDe5IHGBjqaAfxAhL42YFQtz2OvaykI6qr96/B9lACSYrLT9FSdx9vWyyzakPlQF/h56DC0EvJMCnT1YzzvWbmZN5EdF2mdUnFs8DVKO6pmrnDRqtH1f5efcuuKoZR8CLzSFyhTb17f7XusR5LBpWWaN44R9R856WHnKH7qtpmkQi9xXhsIj46cpIXLSfLtgUB7gFmxPyzljkxw9tkOuTvy3HQ=";
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





