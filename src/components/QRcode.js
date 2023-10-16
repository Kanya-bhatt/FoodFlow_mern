import React, { useState } from 'react' 
import QRCode from 'qrcode'

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

        <div className='container mx-auto mt-5'>
            <button className='col-sm-2 btn btn-primary m-2' onClick={generateQrCode}>Generate</button>
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
    );
}

export default QRcode;