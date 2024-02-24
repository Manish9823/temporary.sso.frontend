import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, CircularProgress, Grid } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
import { useTheme } from "@emotion/react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { appConfig, registryConfig } from "../utils/config";
import { setSession } from "../utils/jwt";

// TODO remove, this demo shouldn't need to reset the theme.

const UserType = {
    ORG_ADMIN: "ORG_ADMIN",
    REGISTRY_ADMIN: "REGISTRY_ADMIN",
    ORG_USER: "ORG_USER",
    TECH_SUPPORT_USER: "TECH_SUPPORT_USER",
};

export default function SignIn() {
    const [userLoginCreds, setUserLoginCreds] = useState({
        email: "",
        password: "",
    });
    const [step, setStep] = useState(1);
    const [organizationList, setOrganizationList] = useState(null);
    const [userUnitData, setUserUnitData] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const inputStyle = {
        color: "#fff !important",
        input: {
            "input:-webkit-autofill:active ": {},
            "-webkit-box-shadow": "0 0 0 30px #706bf9 inset !important",
            "-webkit-text-fill-color": "white",
        },
        "& .MuiOutlinedInput-root": {
            "&>fieldset": {
                borderColor: "#fff",
            },
            "&:hover fieldset": {
                borderColor: "#fff",
            },
            "&:focus fieldset": {
                borderColor: "#fff",
                backgroundColor: `${theme.palette.primary.main}`,
            },
        },
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setUserLoginCreds();
        setUserLoginCreds({
            ...userLoginCreds,
            [name]: value,
        });
    };

    const handleStep1Submit = async () => {
        try {
            setLoading(true);
            const result = await axiosInstance.post(`/login`, {
                email: userLoginCreds.email,
                password: userLoginCreds.password,
            });
            if (result.status === 200 && result.data && result.data.data) {
                const userData = result.data.data;
                const status = result.data.status;
                const token = result.data.token;
                setSession(token);

                if (
                    userData.user_type === UserType.ORG_ADMIN &&
                    status === "SUCCESS"
                ) {
                    redirectToDashBoard();
                } else if (userData.user_type === UserType.TECH_SUPPORT_USER) {
                    fetchBelongingOrganization();
                } else {
                    await fetchUserUnits();
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            alert("Failed to loading");
        }
    };

    const handleStep2Submit = async (organization) => {
        try {
            const result = await axiosInstance.post(`/org-role`, {
                org_id: organization._id,
            });
            if (result.status === 200 && result.data && result.data.data) {
                const token = result.data.token;
                setSession(token);
                fetchUserUnits();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBelongingOrganization = async () => {
        try {
            const result = await axiosInstance.get(`/org-role`, {
                withCredentials: true,
            });
            if (result.status === 200 && result.data && result.data.data) {
                setOrganizationList(result.data.data);
                setStep(2);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true);
        }
    };

    const handleStep3Submit = async (unit) => {
        try {
            const result = await axiosInstance.post(`/unit-role`, {
                unit_type: unit.unit_type,
                unit_id: unit._id,
            });
            if (result.status === 200 && result.data && result.data.data) {
                redirectToDashBoard();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserUnits = async () => {
        try {
            setLoading(true);
            const result = await axiosInstance.get(`/unit-role`, {
                withCredentials: true,
            });
            if (result.status === 200 && result.data && result.data.data) {
                setUserUnitData(result.data.data);
                setStep(3);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const redirectToDashBoard = async () => {
        window.location.href = appConfig.VITE_AFTER_LOGIN_REDIRECT_TO;
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container height={"100vh"}>
                <Grid
                    item
                    md={3}
                    container
                    direction={"column"}
                    alignItems={"center"}
                    style={{
                        backgroundColor: `${theme.palette.primary.themeMain}`,
                    }}
                >
                    <Grid
                        item
                        style={{
                            display: "flex",
                            textAlign: "start",
                            gap: "20px",
                            fontSize: "20px",
                            marginTop: "20px",
                            color: "white",
                        }}
                    >
                        <img
                            src={registryConfig.logUrl}
                            style={{
                                objectFit: "cover",
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }}
                        />
                        <Grid mt={2}>
                            {registryConfig.registryName}
                            <br />
                            Communication ERP
                        </Grid>
                    </Grid>
                    <Grid item flex={1} container justifyContent={"center"}>
                        {step === 1 && (
                            <Grid
                                item
                                md={11}
                                className="d-flex"
                                style={{ justifySelf: "flex-start" }}
                            >
                                <Card
                                    style={{
                                        height: "auto",
                                        width: "100%",
                                        boxShadow: "none",
                                        borderRadius: "18px",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            marginTop: 8,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                        padding={3}
                                    >
                                        <Grid
                                            style={{
                                                margin: "auto",
                                                width: "100%",
                                                padding: "4px",
                                                color: "white",
                                                fontSize: "1.5rem",
                                                textAlign: "center",
                                            }}
                                        >
                                            Log In
                                        </Grid>
                                        <Grid
                                            component="form"
                                            style={{
                                                margin: "auto",
                                                width: "100%",
                                                padding: "4px",
                                            }}
                                        >
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                onChange={handleChange}
                                                value={userLoginCreds.email}
                                                sx={inputStyle}
                                                InputLabelProps={{
                                                    style: { color: "#fff" },
                                                }}
                                            />
                                            <TextField
                                                className="mb-3"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                value={userLoginCreds.password}
                                                sx={inputStyle}
                                                InputLabelProps={{
                                                    style: { color: "#fff" },
                                                }}
                                            />

                                            <Grid mt={4}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    style={{
                                                        height: "28%",
                                                        backgroundColor:
                                                            "white",
                                                        color: `${theme.palette.primary.themeMain}`,
                                                        fontWeight: "bold",
                                                        fontSize: "18px",
                                                    }}
                                                    onClick={handleStep1Submit}
                                                    disabled={loading}
                                                >
                                                    {loading === true ? (
                                                        <CircularProgress
                                                            sx={{
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .themeMain,
                                                            }}
                                                        />
                                                    ) : (
                                                        "Log In"
                                                    )}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        )}

                        {step === 2 && (
                            <Grid
                                item
                                md={11}
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                gap={5}
                                borderRadius={2}
                            >
                                <Grid>
                                    <Typography variant="h5" color={"white"}>
                                        Select Organization
                                    </Typography>
                                </Grid>
                                <Grid
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        color: theme.palette.primary.themeMain,
                                    }}
                                    gap={1}
                                >
                                    {organizationList &&
                                        Array.isArray(organizationList) &&
                                        organizationList.length > 0 &&
                                        organizationList.map(
                                            (organization, index) => {
                                                return (
                                                    <Grid
                                                        key={`${organization._id}-${index}`}
                                                        onClick={() => {
                                                            handleStep2Submit(
                                                                organization
                                                            );
                                                        }}
                                                        boxShadow={2}
                                                        borderRadius={2}
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                        justifyContent={
                                                            "space-between"
                                                        }
                                                        className="user-role-items"
                                                        gap={3}
                                                        padding={1}
                                                        sx={{
                                                            background: "white",
                                                            color: theme.palette
                                                                .primary
                                                                .themeMain,
                                                        }}
                                                    >
                                                        <Grid
                                                            flex={1}
                                                            padding={1}
                                                            display={"flex"}
                                                            justifyContent={
                                                                "space-between"
                                                            }
                                                        >
                                                            <Grid
                                                                fontWeight={
                                                                    "bold"
                                                                }
                                                            >
                                                                {organization.organization_name &&
                                                                    String(
                                                                        organization.organization_name
                                                                    ).toUpperCase()}
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="user-role-item-arrow">
                                                            <ArrowForwardIcon />
                                                        </Grid>
                                                    </Grid>
                                                );
                                            }
                                        )}
                                </Grid>
                            </Grid>
                        )}
                        {step === 3 && (
                            <Grid
                                item
                                md={11}
                                sx={{
                                    marginTop: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                gap={5}
                                borderRadius={2}
                            >
                                <Grid>
                                    <Typography variant="h5" color={"white"}>
                                        Select Log in as
                                    </Typography>
                                </Grid>
                                <Grid
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                    }}
                                    gap={1}
                                >
                                    {userUnitData &&
                                        Array.isArray(userUnitData) &&
                                        userUnitData.length > 0 &&
                                        userUnitData.map((unit, index) => {
                                            return (
                                                <Grid
                                                    key={`${unit._id}-${index}`}
                                                    onClick={() => {
                                                        handleStep3Submit(unit);
                                                    }}
                                                    boxShadow={2}
                                                    borderRadius={2}
                                                    display={"flex"}
                                                    alignItems={"center"}
                                                    justifyContent={
                                                        "space-between"
                                                    }
                                                    className="user-role-items"
                                                    gap={2}
                                                    padding={1}
                                                    sx={{
                                                        background: "#fff",
                                                        color: theme.palette
                                                            .primary.themeMain,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Grid
                                                        flex={1}
                                                        padding={1}
                                                        display={"flex"}
                                                        justifyContent={
                                                            "space-between"
                                                        }
                                                    >
                                                        <Grid
                                                            fontWeight={"bold"}
                                                        >
                                                            {unit.unit_name &&
                                                                String(
                                                                    unit.unit_name
                                                                ).toUpperCase()}
                                                        </Grid>
                                                        <Typography variant="caption">
                                                            {unit.unit_type ===
                                                            "MONITORING_UNIT"
                                                                ? "Monitoring Unit"
                                                                : "Consumer Unit"}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid className="user-role-item-arrow">
                                                        <ArrowForwardIcon />
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid
                    item
                    md={9}
                    style={{ display: "flex", textAlign: "center" }}
                >
                    <img
                        src="welcome.png"
                        style={{ height: "98vh", objectFit: "contain" }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
