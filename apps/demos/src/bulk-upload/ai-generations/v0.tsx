import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Component() {
  return (
    <div className='flex flex-col gap-4 w-full max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center'>Bulk Event Upload</h1>
      <p className='text-gray-500 dark:text-gray-400 text-center'>
        Paste a list of events or upload a CSV/JSON file. The input will be
        parsed on the server and the results will be displayed as editable
        inputs.
      </p>
      <div className='grid gap-4'>
        <Label htmlFor='events'>Paste Events</Label>
        <Textarea
          className='min-h-[200px]'
          id='events'
          placeholder='Paste your events here'
        />
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='file'>Upload File</Label>
        <Input
          id='file'
          type='file'
        />
      </div>
      <Button type='submit'>Parse Events</Button>
      <div className='grid gap-4'>
        <Label className='font-semibold'>Parsed Events</Label>
        <div className='grid gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <Input
              className='flex-1'
              id='event1'
              type='text'
              value='Event 1'
            />
            <Button variant='outline'>Edit</Button>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <Input
              className='flex-1'
              id='event2'
              type='text'
              value='Event 2'
            />
            <Button variant='outline'>Edit</Button>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <Input
              className='flex-1'
              id='event3'
              type='text'
              value='Event 3'
            />
            <Button variant='outline'>Edit</Button>
          </div>
        </div>
      </div>
      <Button type='submit'>Confirm Changes</Button>
    </div>
  );
}
