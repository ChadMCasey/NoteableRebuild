import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface CategoryDropdownProps {
  default: string;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
  return (
    <Select name='category' defaultValue={props.default}>
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
  );
}
