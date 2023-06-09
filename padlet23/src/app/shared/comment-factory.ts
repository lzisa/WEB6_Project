import {Comment} from "./comment";


export class CommentFactory {
  static empty(): Comment{
    return new Comment(0, '', 0, 0, '');
  }

  static fromObject(rawComment:any):Comment{
    return new Comment(
      rawComment.id,
      rawComment.text,
      rawComment.entry_id,
      rawComment.user_id,
      rawComment.created_at
    )
  }
}
