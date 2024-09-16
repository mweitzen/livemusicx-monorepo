import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
