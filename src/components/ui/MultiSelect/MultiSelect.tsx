import { FC, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { CheckIcon } from '../../icons/check';
import { CheckedIcon } from '../../icons/checked';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IMultipleSelectProps extends Omit<SelectProps<string[]>, 'label' | 'onChange' | 'value'> {
  label?: string;
  options: string[];
  onChange: (selected: string[]) => void;
}

export const MultipleSelect: FC<IMultipleSelectProps> = (props) => {
  const { label, options, onChange, ...others} = props;

  const [selected, setSelect] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value},
    } = event;
    let updatedSelected: string[];

    if (value.includes('all')) {
      setSelectAll((prevSelectAll) => !prevSelectAll);
      if (!selectAll) {
        updatedSelected = options;
      } else {
        updatedSelected = [];
      }
    } else {
      updatedSelected = value as string[];
      setSelectAll(false);
    }
    
    setSelect(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        {...others}
      >
        <MenuItem key="all" value="all">
          <Checkbox
            checked={selectAll}
            icon={<CheckIcon />}
            checkedIcon={<CheckedIcon />}
          />
          <ListItemText primary="Все" />
        </MenuItem>
        {options.map((option) => (
        <MenuItem key={option} value={option}>
            <Checkbox checked={selected.indexOf(option) > -1} icon={<CheckIcon />} checkedIcon={<CheckedIcon />} />
            <ListItemText primary={option} />
        </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
