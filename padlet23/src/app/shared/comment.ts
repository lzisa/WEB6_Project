export class Comment {
  constructor(public id: number,
              public text: string,
              public entry_id: number,
              public user_id: number,
              public created_at: string
  ) {
  }
}
