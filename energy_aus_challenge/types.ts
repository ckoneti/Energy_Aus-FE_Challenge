export interface FestivalDetails {
  name?: string;
  bands: {
    name: string;
    recordLabel?: string;
  }[];
}

export interface BandDetails {
  bandName:string,
  festival?:string | null
}

export interface RecordLabelData {
  recordLabel: string;
  bands: BandDetails[];
};

  