// lib/dynamoClient.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = process.env.APP_AWS_REGION || "us-east-1";
const ACCESS_KEY = process.env.APP_AWS_ACCESS_KEY_ID || "ASIA2CUNLUJZEPNA2JAB";
const SECRET_KEY = process.env.APP_AWS_SECRET_ACCESS_KEY || "ekaB/cbYXHk9TDtUZ5JqTL/mHPyzU8QCC8Bga/Bz";
const SESSION_TOKEN = process.env.APP_AWS_SESSION_TOKEN || "IQoJb3JpZ2luX2VjEGcaCXVzLWVhc3QtMSJHMEUCIFXWJvM1oJ1Rbq+fb2FJceHDWMDc+J+YgM3ajpZ8IAmaAiEArgwNjyE+Dhto/lAYd+a9hmjtHu3fnCnlT6MQbm3+FhAqmgMI0P//////////ARAAGgw2OTI4NTk5MzczOTQiDGR3BVkERlDoiGmWCiruAlNH+PUVtEtFSOobdVEfHIl+WJw9QjZ1GeltFSWIRFOujrt3oXGaeEy7EObhtWIpMI0jFXhyPtIKJaadH+C9GpsoTamItTXL4W6NDfA8sRn0COD3mU4DSpTwqFgUWQ7Xdzb/XD296YiRwlZA2145DDkj/txe+rhw6SAdX9cCudF6PHFplWCQMzu1s5IO51zO3pZltXRAdtOjbBoF2ivcIdtXZg4wLWfDx6N/DoeLUCSg1u4NphTLlTuwTk1OKkXoWoV7+reLlMwnHKKP+1JGE3qL+lTKRzDQtuo6iuEXu12yNYacbQ6AuHVvlHp73DwNYWPFsTHIQrDZABJnAs7oICJH9uHN5LU6mjl4FAObJEC4q/cvwT9l3nLW6PM1jqQ8/ANqutTWOTBuGENb8DQlg+gQ9JhoWq4Rr8ZDmcPUMwM9ajU6CLyso/YSHDPC0Jca7F8+EMTEzTv5LyQtxFhV4v2NMGyHbqANCnJG+KO93TDWkv/FBjqaAeI5gLu1SvXTOvPj6Ds0KgEzZQkpEO3X+OkWm1q3aJjCnbDwgLZ01REw0RdwSRIAO7gebnGAbPLSWb3JEkLAm5HGnujLZytHXBx0bx9XzdpaRBnF/eBCu1ZBUcQbHBeHnxPKUzX1yG18gLMqmpFdh18WNzYfEJbI/D9UE/0BleA3/w3IxeweyLAnZX8XS0BkKfYeYCoWBaWJeKQ=";

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




