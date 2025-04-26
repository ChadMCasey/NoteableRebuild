import createNote from '@/actions/createNote';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function NewNotePage() {
  return (
    <form action={createNote} className='flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='category'>Category</Label>
        <Select name='category' defaultValue='Home'>
          <SelectTrigger className='cursor-pointer'>
            <SelectValue placeholder='Home' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='cursor-pointer' value='Home'>
              Home
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Work'>
              Work
            </SelectItem>
            <SelectItem className='cursor-pointer' value='Personal'>
              Personal
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' placeholder='Note Title' />
      </div>

      <div className='flex flex-col gap-y-2.5'>
        <Label htmlFor='content'>Content</Label>
        <Textarea name='content' placeholder='Note Content' />
      </div>

      <Button type='submit' className='cursor-pointer max-w-min'>
        Create Note
      </Button>
    </form>
  );
}
