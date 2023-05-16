import {Injectable} from '@angular/core';
import {Padlet} from "./padlet";

@Injectable()
export class PadletStoreService {
  padlets: Padlet[] = [];

  constructor() {

    this.padlets = [new Padlet(
      1,
      '12-01-01',
      '12-01-01',
      'Padlet für FH',
      true,
      2,
      'dies ist die Beschreibung'
    )];
  }

  getAll() {
    return this.padlets;
  }

  getSingle(id: number): Padlet {
    return <Padlet>this.padlets.find(padlet => padlet.id === id);

  }
}


