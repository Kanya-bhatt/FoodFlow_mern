import {Card, Container, CardContent, Grid, TextField, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import React, { useState } from 'react' 
import QRCode from 'qrcode'

function QRcode(){
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const qrRef = useRef(null)

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text);
            setImageUrl(response)
            //console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download & Scan QR code with React js</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <TextField onChange={(e)=> setText(e.target.value)}label="Enter Text Here"/>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={()=> generateQrCode()}>Generate</Button>
                            <br></br>
                            <br></br>
                            <br></br>
                            {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="img"/></a>):null}                      
                        </Grid>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = styled((theme) => ({
    container : {
        marginTop : 10
    },
    title : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        background : '#3f51b5',
        color : '#fff',
        padding : 20
    },
    btn :{
        marginTop:10,
        marginBottom:20
    }
}))
export default QRcode;