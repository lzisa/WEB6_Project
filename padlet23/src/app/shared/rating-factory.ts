import {Rating} from "./rating";

export class RatingFactory {
  static empty(): Rating {
    return new Rating(0, 0, false);
  }

  static fromObject(rawRating: any): Rating {
    return new Rating(
      rawRating.user_id,
      rawRating.entry_id,
      rawRating.rating
    )
  }
}
