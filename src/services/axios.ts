import Axios, {
	AxiosHeaders,
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
	RawAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './config';

export const api = Axios.create({
	baseURL: BASE_URL,
	headers: {
		// 'content-type': 'application/json',
	},
});

api.interceptors.request.use(
	async (config) => {
		// config.headers &&
		//   (config.headers as AxiosHeaders).set("Authorization", `JWT`);
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// if (response.status === 200 || response.status === 201) {
		// }
		return response;
	},
	async function (error) {
		if (error?.response?.status === 401) {
			// window.localStorage.clear();
			// return (window.location.href = '/dashboard/home');
		}

		return Promise.reject(error);
	}
);

const request = {
	get: <T>(
		endpoint: string,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return api.get(endpoint, options);
	},
	post: (
		endpoint: string,
		data?: unknown,
		options?: RawAxiosRequestConfig
	): Promise<AxiosResponse> => {
		return api.post(endpoint, data, options);
	},
	put: (
		endpoint: string,
		data: unknown,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> => {
		return api.put(endpoint, data, options);
	},
	patch: (
		endpoint: string,
		data?: unknown,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> => {
		return api.patch(endpoint, Object.assign({}, data), options);
	},
	delete: (
		endpoint: string,
		data?: unknown,
		options?: AxiosRequestHeaders
	): Promise<AxiosResponse> => {
		return api.delete(endpoint, {
			data: data,
			headers: options,
		});
	},
	options: (
		endpoint: string,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> => {
		return api.options(endpoint, options);
	},

	head: (
		endpoint: string,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> => {
		return api.head(endpoint, options);
	},
};

export default request;
