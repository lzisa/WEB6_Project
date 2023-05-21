export class PadletErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {
  }
}

export const PadletErrorMessages = [
  new PadletErrorMessage('title', 'required',
    'Das Padlet muss benannt werden')
];
