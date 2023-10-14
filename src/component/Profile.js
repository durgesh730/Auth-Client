
import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    Grid,
    Button,
    TextField,
} from '@mui/material';
import { host } from '../Host';


const Userdetails = ({ data }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        phone: '',
        email: "",
        fname: "",
        age: "",
        gender: "",
        dob: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            email: data?.email,
            fname: data?.fname,
            age: data?.age,
            gender: data?.gender,
            dob: data?.dob,
            phone: data?.phone
        }));
    }, [data])

    const handleSubmit = () => {
        const formId = data?._id;
        fetch(`${host}api/forms/${formId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update form data');
                }
            })
            .then(data => {
                console.log('Form data updated:', data);
                alert("Updated Successfully")
                window.location.reload()
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid sx={{ paddingTop: "3rem", paddingBottom: "2rem" }} container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Full Name"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                type="email"
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Age"
                                type="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                fullWidth
                                type="gender"
                                name="gender"
                                label="Gender"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>DOB</label>
                            <br />
                            <TextField
                                size="small"
                                fullWidth
                                type="Date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                            <span>Your DOB : {data?.dob} </span>
                        </Grid>
                    </Grid>
                )
        }
    };

    return (
        <>
            <Card sx={{ width: "80%", margin: "auto", position: "relative" }}>
                <Box p={3} sx={{ padding: "4rem", margin: "auto" }} >
                    <form onSubmit={(e) => e.preventDefault()}>
                        {getStepContent(activeStep)}
                        <Grid container justifyContent="space-between" mt={3}>
                            <Grid sx={{ textAlign: "center", margin: "auto" }} item>
                                <Button
                                    onClick={handleSubmit}
                                    sx={{ backgroundColor: "#E07575", padding: " .8rem 3rem", textAlign: "center" }}
                                    variant="contained"

                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Card>

        </>
    );
};

export default Userdetails;

