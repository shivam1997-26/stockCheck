
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../httpRequest/httpRequest';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import toast from 'react-hot-toast';

export default function Report() {

    const [reportData, setReportData] = useState([])
    const [viewData, setViewData] = useState({})
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getReport()
    }, [])


    const getReport = () => {
        const url = 'http://localhost:8000/api/get/requisitionReport'

        getRequest(url).then((data) => {

            const formattedData = data.data.data.map((row, index) => ({
                ...row,
                id: index + 1
            }));
            setReportData(formattedData)
        }).catch((err) => {
            console.log(err)
        })
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 }, // Add a column for id display if necessary
        { field: 'requisition', headerName: 'Requisition No', width: 150 },

        {
            field: 'department',
            headerName: 'Department',
            width: 150,
            renderCell: (params) => (
                <>
                    <Typography>{params.row.department.toUpperCase()}</Typography><br />
                    {
                        params.row.otherdepart && <Typography>Name:{params.row.otherdepart}</Typography>
                    }

                </>
            ),
        },
        { field: 'personName', headerName: 'Person Name', width: 150 },
        { field: 'productName', headerName: 'Product Name', width: 200 },

        {
            field: 'productQnt',
            headerName: 'Quantity',
            width: 150,
            renderCell: (params) => (
                <>
                    <Typography>{params.row.productQnt} {params.row.unit}</Typography>

                </>
            ),
        },
        { field: 'timeLine', headerName: 'Time line', width: 150 },
        { field: 'remark', headerName: 'Remark', width: 200 },
        {
            field: 'approvedByHOD',
            headerName: 'HOD Approval',
            width: 200,
            renderCell: (params) => (
                <>
                    {params.row.approvedByHOD == 'approved' && <span class="badge bg-success">{params.row.approvedByHOD}</span>}
                    {params.row.approvedByHOD == 'Pending' && <span class="badge bg-warning">{params.row.approvedByHOD}</span>}

                </>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <>
                    <VisibilityIcon style={{ color: 'gray' }} onClick={() => handleView(params.row)} />
                    <EditIcon style={{ color: 'green' }} onClick={() => handleEdit(params.row)} />

                </>
            ),
        },
    ];

    const handleView = (data) => {
        setViewData(data)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const approvedClick = (id) => {

        const url = `http://localhost:8000/api/approved/requisition/${id}`
        postRequest(url).then((data) => {
            getReport()
            toast.success('Requisition approved successfully')
            setOpen(false);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div style={{ width: '100%', padding: '20px' }}>

                <DataGrid
                    rows={reportData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50, 100, 500]}

                />
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    View Requisition Details
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>
                            <span className='fw-bolder'>Requisition No:</span> <span>{viewData.requisition}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Department:</span> <span>{viewData.department}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Person Name:</span> <span>{viewData.personName}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Product Name:</span> <span>{viewData.productName}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Product Specification:</span> <span>{viewData.productSpecification}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Product Quantity:</span> <span>{viewData.productQnt} {viewData.unit}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Time Line:</span> <span>{viewData.timeLine}</span>
                        </Typography>
                        <Typography>
                            <span className='fw-bolder'>Remark:</span> <span>{viewData.remark}</span>
                        </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {viewData.approvedByHOD != 'approved' && <Button autoFocus onClick={() => approvedClick(viewData._id)}>Approve</Button>}
                    {viewData.approvedByHOD == 'approved' && <Button style={{ color: 'green' }}>Approved</Button>}
                </DialogActions>
            </Dialog>

        </>

    );
}