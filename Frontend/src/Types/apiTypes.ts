// The structure of your generic API response
export interface ApiSuccessResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  request: {
    ip: string;
    method: string;
    url: string;
  };
  message: string;
  data?: T;
}


export interface ApiErrorDetail {
  message: string;
}

export interface ApiTrace {
  error: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  request: {
    ip: string;
    method: string;
    url: string;
    'user-agent'?: string;
  };
  message: string;
  data: null;
  errors: ApiErrorDetail[];
  trace?: ApiTrace; // Only in dev
}

export type ApiResponseOrError<T> = ApiSuccessResponse<T> | ApiErrorResponse;