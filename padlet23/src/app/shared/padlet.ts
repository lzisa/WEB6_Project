import {Entry} from "./entry";
export {Entry} from "./entry";

export class Padlet {
  constructor(
    public id: number,
    public created_at: string,
    public updated_at: string,
    public title: string,
    public is_public: boolean,
    public user_id: number,
    public description?: string,
    public entries?: Entry[],

    public image?: string
  ) {  }

}
