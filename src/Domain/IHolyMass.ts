export default interface IHolyMass {
  id: string,
  schedule: Date;
  description?: string;
  isObligation: boolean;
}

export default interface IHolyMassSections {
  title: string,
  confessions:string,
  body:string
}