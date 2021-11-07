export type Response = ErrorResponse | SuccessfulResponse

export interface ErrorResponse {
    code: number;
    message: string;
}

export interface SuccessfulResponse {
    code: number;
    payload?: any;
}
