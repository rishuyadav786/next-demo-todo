import { NextRequest, NextResponse } from 'next/server';
import {comments} from './data';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  // You can add any server-side logic here, like fetching from a database
  const headerList=await headers();
  console.log("headerList",headerList.get("Authorization"))
  const searchParams=request.nextUrl.searchParams;
  const query=searchParams.get("query");
  if (query) {
    const filteredComments = comments.filter((comment) => comment.text.includes(query));
    return NextResponse.json(filteredComments);
  }

  return NextResponse.json(comments);
  // return new Response("Hello World");comments
}



export async function POST(request: NextRequest) {
const comments=await request.json();
const newComment={
  id:comments.length+1,
  text:comments.text
};
comments.push(newComment);
return new Response(JSON.stringify(newComment),{
  headers:{"Content-Type":"application/json"},
  status:201
})
}



// import { NextRequest, NextResponse } from 'next/server';
// import {comments} from './data';
// import { headers } from 'next/headers';

// export async function GET(request: NextRequest) {
//   // You can add any server-side logic here, like fetching from a database
//   const headerList=await headers();
//   console.log("headerList",headerList.get("Authorization"))
//   const searchParams=request.nextUrl.searchParams;
//   const query=searchParams.get("query");
//   const filteredComments=query?comments.filter((comment)=>comment.text.includes(query)):comments;
//   // return Response.json(filteredComments)
//   const data = {
//     message: 'Hello from the API route!',
//     comments,
//     timestamp: new Date().toISOString(),
//   };

//   return NextResponse.json(comments);
//   // return new Response("Hello World");comments
// }



// export async function POST(request: NextRequest) {
// const comments=await request.json();
// const newComment={
//   id:comments.length+1,
//   text:comments.text
// };
// comments.push(newComment);
// return new Response(JSON.stringify(newComment),{
//   headers:{"Content-Type":"application/json"},
//   status:201
// })
// }