import { useState, useEffect } from 'react';
import mergeImages from 'merge-images';
import { sample } from 'lodash';
// mui
import {
    Box,
    Stack,
    Typography,
    Paper,
    Container,
    Grid,
    Link
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import AlpacaConfig from '../components/AlpacaConfig';

export default function Main(){
    const theme = useTheme();
    // Initial alpaca variables
    const [alpaca, setAlpaca] = useState({
        backgrounds: "blue50",
        neck: "default",
        ears: "default",
        hair: "default",
        accessories: "headphone",
        leg: "default",
        nose: "default",
        mouth: "default",
        eyes: "default",
    })
    // Initial UI variables
    const [ selected, setSelected ] = useState("hair");
    const [ disable, setDisable ] = useState(false);
    const [ image, setImage ] = useState(null);

    useEffect(() => {
        const merging = async () => {
            const imagesTobeMerge = 
                Object.entries(alpaca).map(([key, value]) => {
                    const imageObj = AlpacaConfig[key].styles.find(obj => {
                        return obj.value === value
                    })
                    return imageObj?.image
                })
            await mergeImages(imagesTobeMerge).then((b64) =>{
                setImage(b64);
            });
        };
        merging();
    }, [alpaca]);

    const handleSelect = (event) => {
        setSelected(event.target.value);
    };

    const handleStyle = (event) => {
        setAlpaca({...alpaca, [event.target.name]: event.target.value});
    };

    const download = (_event) => {
        setDisable(true);
        const tag = document.getElementById('download');
        tag.click();
        setDisable(false);
    };

    const randomize = (_event) => {
        setDisable(true);
        let randomizedAlpaca = alpaca;
        Object.keys(alpaca).forEach(function(key) {
            randomizedAlpaca[key] = sample(AlpacaConfig[key].styles.map((style) => style.value))
        });
        setAlpaca({...randomizedAlpaca})
        setDisable(false);
    };

    return (
        <Paper sx={{backgroundColor: theme.palette.main}}>
            <Container
                sx={{
                    py: 10,
                    px: 2,
                    minHeight: "100vh",
                    width: "100%"
                }}
            >
                <Typography variant='h3' sx={{ fontWeight: 'bold'}} color={theme.palette.title}>Alpaca Generator</Typography>
                <Typography variant='subtitle2' sx={{ fontSize: '1em'}} color={theme.palette.title}>
                    Created by <Link sx={{ fontWeight: 'bold' }} href="https://github.com/R4Rain" underline="none">R4Rain</Link>
                </Typography>
                <Box>
                    <Grid container columns={{ xs: 6, md: 12}} spacing={{ xs: 3, md: 2 }} justifyContent='space-between'>
                        <Grid item xs={6}>
                            <Grid container direction='column' spacing={{ xs: 2 }}>
                                <Grid item xs={12}>
                                    <Box sx={{ maxWidth: 400 }}>
                                        <Stack sx={{ maxHeight: 400, mb: 3 }}>
                                            <img 
                                            src={image}
                                            width="100%"
                                            height="100%"
                                            alt="alpaca"
                                            />
                                        </Stack>
                                        <Stack direction="row" spacing={3}>
                                            <IconButton 
                                            title="Randomize" 
                                            name="randomize"
                                            action={randomize}
                                            disable={disable}
                                            />
                                            <IconButton 
                                            title="Download" 
                                            name="download"
                                            action={download}
                                            disable={disable}
                                            />
                                            <a id="download" download="alpaca.png" href={image} style={{ display: 'none' }}>Download</a>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="column" spacing={4}>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }} color={theme.palette.title}>
                                        Accessorize the Alpaca's
                                    </Typography>
                                    <Grid container spacing={{ xs: 1 }}>
                                        {
                                            Object.entries(AlpacaConfig).map(([key, el]) => {
                                                const {title, value} = el;
                                                return(
                                                    <Grid item xs="auto" key={key}>
                                                        <Button 
                                                        title={title} 
                                                        value={value} 
                                                        selected={selected} 
                                                        onSelect={handleSelect}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }} color={theme.palette.title}>
                                        Choose your style
                                    </Typography>
                                    <Grid container spacing={{ xs: 1 }}>
                                        {
                                            AlpacaConfig[selected].styles.map((el, key) => {
                                                const {title, value} = el;
                                                return(
                                                    <Grid item xs="auto" key={key}>
                                                        <Button 
                                                        title={title} 
                                                        value={value}
                                                        selected={alpaca[selected]}
                                                        onSelect={handleStyle}
                                                        name={selected}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper>
    )
}