import { Request } from 'express'

export type RequestWithBody<T> = Request<Record<string, unknown>, unknown, T>
export type RequestWithParams<P> = Request<P>
export type RequestWithBodyAndParams<B, P> = Request<P, unknown, B>
export type RequestWithQuery<Q> = Request<Record<string, unknown>, unknown, unknown, Q>

export type TypedRequest<P = Record<string, unknown>, B = unknown, Q = Record<string, unknown>> = Request<P, unknown, B, Q>
