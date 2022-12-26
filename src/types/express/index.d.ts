export {}

type payload = {
    sub:string
}

declare global {
  namespace Express {
    export interface Request {
      auth:{
        payload:payload
      }
    }
  }
}