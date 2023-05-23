import {Padlet} from "./padlet";
import {User} from "./user";

export class PadletFactory {
  static empty(): Padlet {
    return new Padlet(0, '', '', '', false, 0,
      new User(0, '',         '', '', []), '',
      '', [], '');
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      typeof (rawPadlet.created_at) === 'string' ? new Date(rawPadlet.created_at) : rawPadlet.created_at,
      rawPadlet.updated_at,
      rawPadlet.title,
      rawPadlet.is_public,
      rawPadlet.user_id,
      rawPadlet.user,
      rawPadlet.picture,
      rawPadlet.description,
      rawPadlet.entries
    );
  }
}
