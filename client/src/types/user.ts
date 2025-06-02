export interface User {
    id: number;
    estado: 'ACTIVO' | 'INACTIVO' | null;
    sector: number;
    usuario: string;
}