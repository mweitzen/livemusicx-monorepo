import {
  Calendar,
  File,
  ListFilter,
  MapPin,
  MoreHorizontal,
  Music,
  PlusCircle,
  Users,
} from "@repo/ui/icons";
import Image from "next/image";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

export default function ManageEventsPage() {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-muted-foreground'>
            Next Event
          </CardTitle>
          <Badge
            variant='secondary'
            className='ml-auto'
          >
            In 3 days
          </Badge>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='space-y-1'>
              <h2 className='text-2xl font-bold'>Summer Beats Festival</h2>
              <div className='flex items-center text-sm'>
                <MapPin className='mr-1 h-4 w-4 text-muted-foreground' />
                Sunset Park Amphitheater
              </div>
              <div className='flex items-center text-sm'>
                <Calendar className='mr-1 h-4 w-4 text-muted-foreground' />
                July 15, 2024 at 4:00 PM
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 mt-2 md:mt-0'>
              <Button size='sm'>
                <Users className='mr-2 h-4 w-4' />
                Manage Staff
              </Button>
              <Button
                size='sm'
                variant='outline'
              >
                <Music className='mr-2 h-4 w-4' />
                Event Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue='all'
        className='mt-4'
      >
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='all'>All Events</TabsTrigger>
            <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
            <TabsTrigger value='past'>Past</TabsTrigger>
            <TabsTrigger
              value='cancelled'
              className='hidden sm:flex'
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          <div className='ml-auto flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 gap-1'
                >
                  <ListFilter className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Upcoming
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Past</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size='sm'
              variant='outline'
              className='h-8 gap-1'
            >
              <File className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Export
              </span>
            </Button>
            <Button
              size='sm'
              className='h-8 gap-1'
            >
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Event
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value='all'>
          <Card>
            <CardHeader>
              <CardTitle>Live Music Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Image</TableHead>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Venue
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Ticket Sales
                    </TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Image
                        alt='Event poster'
                        className='aspect-square rounded-md object-cover'
                        src='/assets/placeholder.svg'
                        height={64}
                        width={64}
                      />
                    </TableCell>
                    <TableCell className='font-medium'>
                      Summer Beats Festival
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>Upcoming</Badge>
                    </TableCell>
                    <TableCell>July 15, 2024</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      Sunset Park Amphitheater
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      15,000 / 20,000
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem>View Ticket Sales</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Image
                        alt='Event poster'
                        className='aspect-square rounded-md object-cover'
                        src='/assets/placeholder.svg'
                        height={64}
                        width={64}
                      />
                    </TableCell>
                    <TableCell className='font-medium'>
                      Jazz Night at Blue Note
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>Upcoming</Badge>
                    </TableCell>
                    <TableCell>June 22, 2024</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      Blue Note Jazz Club
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      180 / 200
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem>View Ticket Sales</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Event</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Image
                        alt='Event poster'
                        className='aspect-square rounded-md object-cover'
                        src='/assets/placeholder.svg'
                        height={64}
                        width={64}
                      />
                    </TableCell>
                    <TableCell className='font-medium'>
                      Rock Legends Reunion Tour
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary'>Past</Badge>
                    </TableCell>
                    <TableCell>November 30, 2023</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      City Arena Stadium
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      50,000 / 50,000
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>
                            View Event Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className='mt-4'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href='#' />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href='#'>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#'
                        isActive
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href='#'>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href='#' />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

// export default function ManageEventsPage() {
//   return (
//     <UnderConstruction
//       title='Manage Events'
//       demoLinks={[
//         { name: "Create Event", href: "/manage/events/new" },
//         { name: "Manage Drafts", href: "/manage/events/drafts" },
//         { name: "Manage Templates", href: "/manage/events/templates" },
//       ]}
//     />
//   );
// }
