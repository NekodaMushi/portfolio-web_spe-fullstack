
import { auth } from "auth";
import { processQuizResult } from "@/lib/api/recall/businessLayer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {

  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const sessionUser = session.user;
    const quizResult = await request.json();

    const result = await processQuizResult(sessionUser, quizResult);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("Error in POST route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch quiz result" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
}
