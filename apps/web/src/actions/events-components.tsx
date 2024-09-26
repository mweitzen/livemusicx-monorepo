import { addToBookmarked, removeFromBookmarked } from "~/actions/events";

import { auth } from "@repo/auth";
import { api } from "@repo/trpc/server";
import { Button } from "@repo/ui/components/button";

export const BookmarkButton = async ({
  id,
  bookmarked,
}: {
  id: string;
  bookmarked?: boolean;
}) => {
  /**
   * Check if user is logged in
   */
  const session = await auth();
  if (!session) return <div>Please log in.</div>;

  /**
   * Check if bookmarked attribute is provided
   */
  if (bookmarked === undefined) {
    bookmarked = await api.events.isBookmarked({ id });
  }

  /**
   * User has event bookmarked
   */
  if (bookmarked) {
    const removeFromBookmarkedWithId = removeFromBookmarked.bind(
      null,
      id,
      undefined
    );
    return (
      <form action={removeFromBookmarkedWithId}>
        <Button>Un-Bookmark</Button>
      </form>
    );
  }

  /**
   * User does NOT have event bookmarked
   */
  const addToBookmarkedWithId = addToBookmarked.bind(null, id, undefined);
  return (
    <form action={addToBookmarkedWithId}>
      <Button>Bookmark</Button>
    </form>
  );
};
