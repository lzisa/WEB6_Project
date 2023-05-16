export class Entry {
  constructor(public id: number,
              public text: string,
              public created_at: string,
              public updated_at: string,
              public padlet_id: number,
              public user_id: number,
              public title: string,
  ) {
  }
}
