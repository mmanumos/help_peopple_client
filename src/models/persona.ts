//DTOs
export class PersonaDto {
    idPersona: number;
    nombre?: string;
    apellido?: string;
    correoElectronico?: string;
    tipoDocumento?: string;
    nroDocumento: number;
    fechaRegistro: Date;
}



//Filters
export class PersonaFilter {
    idPersona: number;
    nroDocumento: number;
    nombre?: string;
    apellido?: string;
    correoElectronico?: string;

    constructor(idPersona: number, nroDocumento: number, nombre?: string, apellido?: string, correoElectronico?: string) {
        this.idPersona = idPersona;
        this.nroDocumento = nroDocumento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
    }
}