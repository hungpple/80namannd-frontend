export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHAT_ENDPOINT = "/api/chat";
const DEFAULT_TIMEOUT_MS = 120_000;

type ChatbotRequestBody = {
  message?: unknown;
  conversationId?: unknown;
  history?: unknown;
};

export async function GET() {
  return jsonResponse({
    status: "ok",
    service: "80namannd-frontend-chatbot-proxy",
  });
}

export async function POST(request: Request) {
  let bodyText = "";

  try {
    bodyText = await request.text();
    const body = JSON.parse(bodyText) as ChatbotRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return jsonResponse(
        { error: "Vui lòng nhập câu hỏi trước khi gửi." },
        { status: 400 }
      );
    }
  } catch {
    return jsonResponse(
      { error: "Yêu cầu chưa đúng định dạng. Vui lòng thử lại." },
      { status: 400 }
    );
  }

  return proxyBackendRequest("POST", CHAT_ENDPOINT, bodyText);
}

async function proxyBackendRequest(
  method: "GET" | "POST",
  endpoint: string,
  body?: string
) {
  const baseUrl = getBackendBaseUrl();

  if (!baseUrl) {
    return jsonResponse(
      {
        error:
          "Hệ thống trợ lý AI chưa được cấu hình. Vui lòng thử lại sau.",
      },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(new URL(endpoint, baseUrl), {
      method,
      headers:
        method === "POST"
          ? {
              "Content-Type": "application/json",
            }
          : undefined,
      body,
      cache: "no-store",
      signal: controller.signal,
    });
    const contentType = response.headers.get("Content-Type") ?? "application/json";
    const responseText = await response.text();

    if (!response.ok) {
      return jsonResponse(
        {
          error: createFriendlyProxyError(response.status, responseText),
        },
        { status: response.status }
      );
    }

    return new Response(responseText, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("[chatbot-proxy] Backend request failed.", error);

    return jsonResponse(
      {
        error:
          "Hệ thống trợ lý AI tạm thời chưa phản hồi. Vui lòng thử lại sau ít phút.",
      },
      { status: 504 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

function getBackendBaseUrl() {
  const value =
    process.env.CHATBOT_API_BASE_URL ??
    process.env.NEXT_PUBLIC_CHATBOT_API_BASE_URL ??
    "";

  if (!value.trim()) {
    return "";
  }

  try {
    const url = new URL(value);

    return `${url.origin}${url.pathname.replace(/\/$/, "")}/`;
  } catch {
    return "";
  }
}

function createFriendlyProxyError(status: number, responseText: string) {
  if (status === 400) {
    const backendMessage = readSimpleValidationMessage(responseText);

    if (backendMessage) {
      return backendMessage;
    }

    return "Yêu cầu chưa phù hợp. Vui lòng kiểm tra câu hỏi và thử lại.";
  }

  if (status === 429) {
    return "Hệ thống đang nhận nhiều yêu cầu. Vui lòng thử lại sau ít phút.";
  }

  return "Hệ thống trợ lý AI tạm thời chưa xử lý được yêu cầu. Vui lòng thử lại sau.";
}

function readSimpleValidationMessage(responseText: string) {
  try {
    const payload = JSON.parse(responseText) as { error?: unknown };
    const error = typeof payload.error === "string" ? payload.error.trim() : "";

    return error === "Vui lòng nhập câu hỏi trước khi gửi." ? error : "";
  } catch {
    return "";
  }
}

function jsonResponse(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}
