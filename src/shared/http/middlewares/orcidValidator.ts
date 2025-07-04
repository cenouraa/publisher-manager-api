import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default function validateORCID(request: Request, response: Response, next: NextFunction): void{
    try{
        const { orcid } = request.body
        if(!orcid){
            throw new AppError('ORCID is required.', 400)
        }

        if(!/^\d{4}-\d{4}-\d{4}-\d{3}[\dXx]$/.test(orcid)){
            throw new AppError('ORCID format invalid. Use XXXX-XXXX-XXXX-XXX(X).', 400)
        }

        const digitos = orcid.replace(/-/g, '')
        let total = 0

        for(let i=0; i<15; i++){
            const digito = parseInt(digitos[i], 10)
            if (isNaN(digito)) { 
                    throw new AppError('ORCID contains invalid characters.', 400);
                }
            total = (total + digito) * 2
        }

        const resto = total % 11
        const resultado = (12 - resto) % 11
        const digitoCheck = resultado === 10 ? 'X' : resultado.toString()

        if(digitoCheck !== digitos[15].toUpperCase()){
            throw new AppError('Invalid ORCID.', 400)
        }

        return next()
    } catch(err) {
        next(err)
    }
}