export interface ReclamationDTO {
  reclamationId: number;
  status: boolean;
  categorie: string;
  date: string | Date;
  clientNom: string;
  clientPrenom: string;
  detail: string;
}
