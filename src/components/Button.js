import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { useTheme, styled } from '@mui/material/styles';


export default function Button({title, name, value, selected, onSelect}){
    const theme = useTheme();
    const CustomButton = styled(ButtonUnstyled)`
      font-family: IBM Plex Sans, sans-serif;
      font-weight: bold;
      font-size: 1rem;
      color: ${({ selected }) => (selected ? theme.palette['white'] : theme.palette['blue'])};
      padding: 12px 24px;
      border: 1px solid ${theme.palette['blue']};
      border-radius: 20px;
      background-color: ${({ selected }) => (selected ? theme.palette['blue'] : theme.palette['white'])};
      transition: all 150ms ease;
      cursor: pointer;
      width: 100%;
      height: 100%;
      opacity: ${({ selected }) => (selected ? 1 : 0.5)};
      &:hover {
        opacity: 1;
        outline: ${({ selected }) => (selected ? 'none' : `1px solid ${theme.palette['blue']}`)};
      }

      &.${buttonUnstyledClasses.disabled} {
        cursor: not-allowed;
      }
    `;
    return (
        <CustomButton name={name} value={value} selected={selected === value} onClick={onSelect}>
          {title}
        </CustomButton>
    )
}