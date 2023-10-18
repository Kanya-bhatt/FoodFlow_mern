import React, { useCallback, useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode';
import OrderDetails from './Order_details'
import AdminNavbar from '../components/Admin_Navbar'
import Footer from '../components/Footer'

function Admin_Home() {
    const [scanResultFile, setScanResultFile] = useState(null)
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        })

        scanner.render(success, error)

        function success(result) {
            scanner.clear();
            setScanResultFile(result)
        }

        function error(err) {
            console.warn(err)
        }
    }, [])

    const fetchOrders = useCallback(async () => {
        // console.log(scanResultFile)
        await fetch("http://localhost:3000/api/displayOrders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: scanResultFile
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            if (response) {
                setOrderData(response);
            }
        });
    }, [scanResultFile])

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <>
            <AdminNavbar />
            <div className='container mx-auto mt-5'>
                <div className='row'>
                    <div className='card col-sm-4 mx-auto m-2'>
                        <div className='card-body text-center'>
                            {scanResultFile ? <div>Success : {scanResultFile}</div> : <div id='reader'></div>}
                        </div>
                    </div>
                </div>
                <OrderDetails result={orderData} dataId={scanResultFile} />
            </div>
            <Footer />
        </>
    )
}

export default Admin_Home;

