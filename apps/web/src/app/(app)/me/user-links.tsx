import { Bookmark, Star, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserLinks() {
  return (
    <nav>
      <ul className='space-y-2'>
        <li>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <Bookmark className='mr-2 h-4 w-4' />
            Bookmarked Events
          </Button>
        </li>
        <li>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <Star className='mr-2 h-4 w-4' />
            Favorite Artists
          </Button>
        </li>
        <li>
          <Button
            variant='ghost'
            className='w-full justify-start'
          >
            <Ticket className='mr-2 h-4 w-4' />
            Ticket History
          </Button>
        </li>
      </ul>
    </nav>
  );
}
