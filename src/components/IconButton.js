import { Button } from '@mui/material'
// icons
import DownloadIcon from '@mui/icons-material/Download';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function IconButton({title, name, action, disable}){
    const icons = {
        download: {
            icon: <DownloadIcon/>,
            color: 'success'
        },
        randomize: {
            icon: <ShuffleIcon/>,
            color: 'warning'
        }
    }
    return(
        <Button 
        name={name} 
        onClick={action} 
        startIcon={icons[name].icon}
        variant="contained"
        color={icons[name].color}
        sx={{ width: '100%', py: 1 }}
        disabled={disable}
        >
            {title}
        </Button>
    )
}