import { ErrorMessage } from "../types/ErrorMessages";
import { RequestMethods } from "../types/RequestMethods";


async function request<DataModel>(
  url: URL,
  method: RequestMethods = RequestMethods.GET,
  headers: unknown = null,
  data: unknown = null,
): Promise<DataModel> {
  const fullUrl = url.href;
  const options: RequestInit = { method };

  if (headers) {
    options.headers = { ...headers };
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const data = await fetch(fullUrl, options);
    const parsedData = await data.json();

    return parsedData;
  } catch {
    throw new Error(ErrorMessage.LOAD_DATA);
  }
}

export const requestMethods = {
  get: <DataModel>(url: URL, headers: unknown = {}) => request<DataModel>(url, RequestMethods.GET, headers),
};
