import {IHeader} from '../Domain/IHeader';
import log from './Logging';
import {ERROR, EventEmitter} from "./EventEmitter";

function getHeaders(additionalHeaders?: IHeader[], json: boolean = true): Headers {
  const headers = new Headers();
  if(json){
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  } else {
    headers.append('Accept', '*/*');
  }
  if (additionalHeaders && additionalHeaders.length) {
    additionalHeaders.forEach(h => headers.append(h.key, h.value));
  }
  return headers;
}

async function request<T>(url: string, method: string, body?: any, additionalHeaders?: IHeader[], formData?: FormData): Promise<T> {
  const headers = getHeaders(additionalHeaders, body != null);
  const options: RequestInit = {
    headers,
    method,
    body: body
      ? JSON.stringify(body)
      : formData ? formData : undefined
  };

  log.info(`Sending ${method} request to ${url}`);

  let response = await fetch(url, options);
  if (response.ok) {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text() as T;
    }
  }
  log.error(`Error ${response.status} (${response.statusText}) while sending ${method} request to ${url} 
              with options ${JSON.stringify(options)}`);
  const errorText = await response.text();
  log.error(errorText);
  EventEmitter.trigger(ERROR, `Error ${response.status} (${response.statusText})`);
  return undefined as unknown as Promise<T>;
}

export const http = {
  get: <T>(url: string, additionalHeaders?: IHeader[]): Promise<T> =>
    request<T>(url, 'GET', undefined, additionalHeaders),
  post: <T>(url: string, body: any, additionalHeaders?: IHeader[]): Promise<T> =>
    request<T>(url, 'POST', body, additionalHeaders),
  put: <T>(url: string, body: any, additionalHeaders?: IHeader[]): Promise<T> =>
    request<T>(url, 'PUT', body, additionalHeaders),
  delete: <T>(url: string, additionalHeaders?: IHeader[]): Promise<T> =>
    request<T>(url, 'DELETE', undefined, additionalHeaders),
  uploadFile: async (url: string, formData: FormData, additionalHeaders?: IHeader[]): Promise<string> =>
    request<string>(url, 'POST', undefined, additionalHeaders, formData)
};

export default http;