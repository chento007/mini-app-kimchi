"use client";


class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text().catch(() => response.statusText);
    throw new ApiError(response.status, error);
  }

  return response.json();
}

export const api = {
  get: <T>(url: string): Promise<T> =>
    fetch(`${BASE_URL}${url}`).then(handleResponse<T>),

  post: <T>(url: string, data?: any): Promise<T> =>
    fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<T>),

  put: <T>(url: string, data?: any): Promise<T> =>
    fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handleResponse<T>),

  delete: <T>(url: string): Promise<T> =>
    fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
    }).then(handleResponse<T>),
};
