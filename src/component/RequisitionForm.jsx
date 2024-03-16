import React, { useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postRequest } from '../httpRequest/httpRequest';
import toast from 'react-hot-toast';

const RequisitionForm = () => {
    const [department, setDepartment] = useState('')

    const [formData, setFormData] = useState({
        requisition: '',
        department: '',
        otherdepart: '',
        personName: '',
        productName: '',
        productSpecification: '',
        productQnt: '',
        unit: '',
        timeLine: '',
        remark: ''

    })

    const formHandle = (e) => {

        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            timeLine: date.format('YYYY-MM-DD')
        }));
    };


    const formSubmit = () => {
        const url = 'http://localhost:8000/api/add-requisition'
        postRequest(url, formData).then((data) => {
           
            toast.success(data.data.msg)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div style={{padding:'20px'}}>
            <Paper component="fieldset" style={{ padding: '50px' }}>
                <legend><Typography variant='h5'>Requisition Form</Typography></legend>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" value={formData.requisition} name='requisition' onChange={formHandle} label="Requisition No" variant="outlined" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Age"
                                    value={formData.department}
                                    onChange={formHandle}
                                    name='department'
                                >

                                    <MenuItem value='qc'>QC</MenuItem>
                                    <MenuItem value='qa'>QA</MenuItem>
                                    <MenuItem value='rnd'>R&D</MenuItem>
                                    <MenuItem value='production'>Production</MenuItem>
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='store'>Store</MenuItem>
                                    <MenuItem value='other'>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            formData.department === 'other' && <Grid item xs={6}>
                                <TextField id="outlined-basic" name='otherdepart' value={formData.otherdepart} onChange={formHandle} label="Other" variant="outlined" style={{ width: '100%' }} />
                            </Grid>
                        }
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" name='personName' value={formData.personName} onChange={formHandle} label="Person Name" variant="outlined" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" name='productName' value={formData.productName} onChange={formHandle} label="Product Name" variant="outlined" style={{ width: '100%' }} />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" name='productSpecification' value={formData.productSpecification} onChange={formHandle} label="Product Specification" variant="outlined" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" name='productQnt' value={formData.productQnt} label="Product Quantity" onChange={formHandle} variant="outlined" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl style={{ width: '100%' }} >
                                <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Age"
                                    value={formData.unit}
                                    onChange={formHandle}
                                    name='unit'
                                >

                                    <MenuItem value='kg'>kg</MenuItem>
                                    <MenuItem value='peice'>piece</MenuItem>
                                    <MenuItem value='rnd'>R&D</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker name='timeLine' onChange={handleDateChange} value={formData.timeLine} style={{ width: '100%' }} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" name='remark' onChange={formHandle} value={formData.remark} label="Remark" variant="outlined" style={{ width: '100%' }} />
                        </Grid>

                        <Grid item xs={4}>
                            <Button variant='contained' onClick={formSubmit}>Submit HOD</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant='contained'>Submit HOD</Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button variant='contained'>Submit HOD</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
        </div>
    )
}

export default RequisitionForm