export class Serviceerror extends Error {
    constructor(message: string, data?: any, status?: string){
        super(message);
    }
}
