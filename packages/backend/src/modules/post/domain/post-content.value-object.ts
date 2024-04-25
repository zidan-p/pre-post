import { Guard } from "~/common/core/Guard";
import { Result } from "~/common/core/Result";
import { ValueObject } from "~/common/domain/Value-object";





interface PostContentProps {
  value: string;
}

/**\
 * it's not a problem to store entire content in database.
 * our dbms already handle that.
 * https://softwareengineering.stackexchange.com/questions/335925/do-i-store-blog-posts-in-a-database-and-how-do-i-continue-to-make-posts
 */
export class PostContent extends ValueObject<PostContentProps>{

  private constructor(props: PostContentProps){ super(props) }

  get value (): string { return this.props.value }

  public static create(props: PostContentProps){
    const nullGuard = Guard.againstNullOrUndefined(props.value, "post content value");

    if(nullGuard.isFailure) return nullGuard as unknown as Result<PostContent>;

    return Result.ok<PostContent>(new PostContent(props));
  }

}