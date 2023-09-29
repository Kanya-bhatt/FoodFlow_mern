import React, { useState } from 'react'
import {QrReader} from 'react-qr-reader'
import {Card, Container, CardContent, Grid, TextField, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useRef} from 'react'

function QRCodeReader() {
    const [scanResultFile, setScanResultFile] = useState('')
    const qrRef = useRef(null)

    const handleErrorFile = (error) => {
        console.log(error);
    }

    const handleScanFile =(result) => {
        if(result){
            setScanResultFile(result);
        }
    }

    const onScanFile =() => {
        if (qrRef.current) {
            qrRef.current.openImageDialog();
          }
    }
    const classes = useStyles();
  return (
    <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download & Scan QR code with React js</h2>
                <CardContent>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Button className={classes.btn} variant='contained' color='secondary' onClick={onScanFile}>Scan QR code</Button>
                            <QrReader 
                            ref = {qrRef}
                            delay ={300}
                            style ={{width : '100%'}}
                            onError = {handleErrorFile}
                            onScan={handleScanFile}
                            legacyMode
                            />
                            <h3>Scanned code : {scanResultFile}</h3>
                        </Grid>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
                </CardContent>
            </Card>
        </Container>
  )
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

export default QRCodeReader;

