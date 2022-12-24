import { Request, Response, NextFunction } from "express";
import { errorResponse } from '../network/response'

export function boomErrorHandler(err: any,req:Request,res: Response,next: NextFunction){
    if(err.isBoom){
        // console.log(err)
        const{output}=err;
        errorResponse(req, res, output.payload, output.statusCode || 500)
        return
    }
    next(err);
}

export function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
    console.log(err)
    errorResponse(req, res, err.message, err.status)
}
