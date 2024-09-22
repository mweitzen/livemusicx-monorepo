import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";

export default function UserCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Music Enthusiast</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Avatar className='h-32 w-32'>
          <AvatarImage
            src='/assets/placeholder.svg?height=128&width=128'
            alt='John Doe'
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Change Avatar</Button>
      </CardFooter>
    </Card>
  );
}
