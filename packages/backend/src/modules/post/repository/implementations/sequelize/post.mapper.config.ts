import { OrderByCofig } from "~/common/types/filter-query";
import { ObjectArrayableValue } from "~/common/types/object";
import { AdvaceObjectMapperConfig } from "~/common/utils/object";
import { PostPropsWithId } from "~/modules/post/domain/post.agregate-root";

/** for single fiel option */
export const ObjectMapperConfig: AdvaceObjectMapperConfig<PostPropsWithId> = {
  postId: {
    outKey: "id",
    mapper: (id) => id.getStringValue(),
  },
  dateTimeCreated: {
    outKey: "date_time_created",
    mapper: (date) => date
  },
  dateTimePosted: {
    outKey: "date_time_posted"
  },
  isPublised: {
    outKey: "is_published"
  },
  ownerId: {
    outKey: "owner_id",
    mapper: (id) => id.getStringValue()
  },
  postContent: {
    outKey: "content",
    mapper: (content) => content.value
  },
  postImageManager: {
    outKey: "image_id",
    mapper: (singeImageManager) => {
      const image = singeImageManager.getImage;
      if(!image) return null;
      return image.id.toString()
    }
  },
  postTitle: {
    outKey: "title",
    mapper: title => title.value
  }
} as const;

/** for multiple field option */
export const ObjectWhereInConfig: AdvaceObjectMapperConfig<ObjectArrayableValue<PostPropsWithId>> = {
  postId: {
    outKey: "id",
    mapper: (id) => id.map(item => item.getStringValue()),
  },
  dateTimeCreated: {
    outKey: "date_time_created",
    mapper: (date) => date
  },
  dateTimePosted: {
    outKey: "date_time_posted"
  },
  isPublised: {
    outKey: "is_published"
  },
  ownerId: {
    outKey: "owner_id",
    mapper: (id) => id.map(item => item.getStringValue())
  },
  postContent: {
    outKey: "content",
    mapper: (content) => content.map(item => item.value)
  },
  postImageManager: {
    outKey: "image_id",
    mapper: (singeImageManagerCollection) => {
      singeImageManagerCollection.map(singleImageManager => {
        const image = singleImageManager.getImage;
        if(!image) return null;
        return image.id.toString()
      })
    }
  },
  postTitle: {
    outKey: "title",
    mapper: title => title.map(item => item.value)
  }
}