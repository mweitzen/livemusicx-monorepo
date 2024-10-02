import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Badge } from "@repo/ui/components/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Mail, Eye, Download, Upload } from "@repo/ui/icons";

export function AttendeesContent() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Attendee Management</CardTitle>
          <CardDescription>View and manage event attendees</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className='flex items-center'>
                    <Avatar className='h-8 w-8 mr-2'>
                      <AvatarImage
                        src='/placeholder.svg?height=32&width=32'
                        alt='@johndoe'
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                  </div>
                </TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Local Music Night</TableCell>
                <TableCell>General Admission</TableCell>
                <TableCell>
                  <Badge>Registered</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='sm'
                    className='mr-2'
                  >
                    <Mail className='h-4 w-4 mr-1' />
                    Contact
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    <Eye className='h-4 w-4 mr-1' />
                    View
                  </Button>
                </TableCell>
              </TableRow>
              {/* Add more attendee rows here */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <BulkActions />
    </div>
  );
}

function BulkActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Actions</CardTitle>
        <CardDescription>Perform actions on multiple attendees</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-2'>
          <Button variant='outline'>
            <Mail className='h-4 w-4 mr-1' />
            Email Selected
          </Button>
          <Button variant='outline'>
            <Download className='h-4 w-4 mr-1' />
            Export CSV
          </Button>
          <Button variant='outline'>
            <Upload className='h-4 w-4 mr-1' />
            Import Attendees
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
