"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Calendar, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const streamingData = [
  { name: "Jan", spotify: 4000, youtube: 2400, appleMusic: 2400 },
  { name: "Feb", spotify: 3000, youtube: 1398, appleMusic: 2210 },
  { name: "Mar", spotify: 2000, youtube: 9800, appleMusic: 2290 },
  { name: "Apr", spotify: 2780, youtube: 3908, appleMusic: 2000 },
  { name: "May", spotify: 1890, youtube: 4800, appleMusic: 2181 },
  { name: "Jun", spotify: 2390, youtube: 3800, appleMusic: 2500 },
];

export default function MusicianDashboard() {
  return (
    <>
      <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>

      {/* Metrics */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Streams</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M2 10l20-4M2 20l20-4M22 20V4' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,345,678</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              YouTube Subscribers
            </CardTitle>
            <Youtube className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>54.3K</div>
            <p className='text-xs text-muted-foreground'>
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Spotify Followers
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle
                cx='12'
                cy='12'
                r='10'
              />
              <path d='M8 14s1.5 2 4 2 4-2 4-2' />
              <line
                x1='9'
                y1='9'
                x2='9.01'
                y2='9'
              />
              <line
                x1='15'
                y1='9'
                x2='15.01'
                y2='9'
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24.8K</div>
            <p className='text-xs text-muted-foreground'>
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Upcoming Events
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>7</div>
            <p className='text-xs text-muted-foreground'>
              Next event in 3 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Streaming Chart */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Streaming Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer
            width='100%'
            height={300}
          >
            <BarChart data={streamingData}>
              <XAxis
                dataKey='name'
                stroke='#888888'
                fontSize={12}
                tick={{ fill: "#888888" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tick={{ fill: "#888888" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey='spotify'
                fill='#1DB954'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='youtube'
                fill='#FF0000'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='appleMusic'
                fill='#FC3C44'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Upcoming Events and Latest Releases */}
      <div className='grid gap-4 md:grid-cols-2 mb-6'>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Jun 15, 2023</TableCell>
                  <TableCell>Summer Music Festival</TableCell>
                  <TableCell>Central Park, NY</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jun 22, 2023</TableCell>
                  <TableCell>Album Release Party</TableCell>
                  <TableCell>The Roxy, LA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jul 1, 2023</TableCell>
                  <TableCell>Radio Interview</TableCell>
                  <TableCell>KEXP, Seattle</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Release Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Summer Nights</TableCell>
                  <TableCell>Single</TableCell>
                  <TableCell>May 1, 2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Echoes of Tomorrow</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Mar 15, 2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Neon Dreams (Remix)</TableCell>
                  <TableCell>Single</TableCell>
                  <TableCell>Feb 1, 2023</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Scheduler */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Scheduler</CardTitle>
          <CardDescription>
            Schedule your posts across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue='create'
            className='w-full'
          >
            <TabsList>
              <TabsTrigger value='create'>Create Post</TabsTrigger>
              <TabsTrigger value='scheduled'>Scheduled Posts</TabsTrigger>
            </TabsList>
            <TabsContent value='create'>
              <form className='space-y-4'>
                <div>
                  <label
                    htmlFor='post-content'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Post Content
                  </label>
                  <textarea
                    id='post-content'
                    rows={3}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    placeholder="What's on your mind?"
                  />
                </div>
                <div>
                  <label
                    htmlFor='post-date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Schedule Date
                  </label>
                  <Input
                    type='datetime-local'
                    id='post-date'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Platforms
                  </label>
                  <div className='mt-2 space-x-2'>
                    <label className='inline-flex items-center'>
                      <input
                        type='checkbox'
                        className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2'>Instagram</span>
                    </label>
                    <label className='inline-flex items-center'>
                      <input
                        type='checkbox'
                        className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2'>Twitter</span>
                    </label>
                    <label className='inline-flex items-center'>
                      <input
                        type='checkbox'
                        className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                      />
                      <span className='ml-2'>Facebook</span>
                    </label>
                  </div>
                </div>
                <Button>Schedule Post</Button>
              </form>
            </TabsContent>
            <TabsContent value='scheduled'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Platforms</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Jun 10, 2023 15:00</TableCell>
                    <TableCell>Excited for the upcoming show!</TableCell>
                    <TableCell>Instagram, Twitter</TableCell>
                    <TableCell>
                      <Button variant='ghost'>Edit</Button>
                      <Button variant='ghost'>Delete</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jun 12, 2023 10:00</TableCell>
                    <TableCell>New single out now! Link in bio.</TableCell>
                    <TableCell>Instagram, Facebook</TableCell>
                    <TableCell>
                      <Button variant='ghost'>Edit</Button>
                      <Button variant='ghost'>Delete</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
