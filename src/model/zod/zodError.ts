export interface ZodError{
    code: string,
    expected: string,
    received: string,
    path: string[],
    message: string
}

