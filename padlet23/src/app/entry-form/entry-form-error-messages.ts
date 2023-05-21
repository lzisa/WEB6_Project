import {PadletErrorMessage} from "../padlet-form/padlet-form-error-messages";

export class EntryErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ){}
}


export const EntryErrorMessages = [
  new EntryErrorMessage('title', 'required', 'Der Eintrag benötigt einen Titel')
];
