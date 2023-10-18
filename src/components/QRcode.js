import React, { useState } from 'react' 
import QRCode from 'qrcode'
import Navbar from './Navbar'
import Footer from './Footer'

function QRcode(props){
    const [imageUrl, setImageUrl] = useState('')

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(props.id);
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <Navbar/>
        <div className='container mx-auto mt-5'>
            <button className='col-sm-2 btn m-2' style={{ backgroundColor: '#006367', color: '#6BB7BB' }} onClick={generateQrCode}><b>Generate</b></button>
            <div className='row'>
                <div className='card col-sm-4 mx-auto m-2'>
                    <div className='card-header'>
                        <h3 className='badges text-center'>Qrcode image</h3>
                    </div>
                    <div className='card-body text-center'>
                    {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="img"/></a>):null} 
                    </div>
                </div>
            </div>
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
                <Footer />
            </div>
        </>
    );
}

export default QRcode;