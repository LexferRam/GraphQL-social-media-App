import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, InputLabel,  Alert, Stack, IconButton, Collapse, Grid } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation, gql } from '@apollo/client'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom'
import {useAuthContext} from '../context/auth'

const schema = yup.object().shape({
    username: yup.string().required("Nombre es requerido!"),
    password: yup.string().min(4, "Contrasena de al menos 4 caracteres").max(15).required("Debe ingresar una contrasena"),
})

const Login = () => {
    const {login} = useAuthContext()
    const [loginData, setLoginData] = useState({})
    const [errorsForm, setErrorsForm] = useState({})
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, {data:{login: userData}}) {
            //accion que se ejecuta cuando ya tenemoms el ressultado exitoso
            console.log(userData)
            login(userData)
            navigate('/')
        },
        onError(errors) {
            console.log(errors.graphQLErrors[0].extensions.errors)
            setErrorsForm(errors.graphQLErrors[0].extensions.errors)
            setOpen(true)
        },
        variables: loginData
    })

    const onSubmit = (data) => {
        setLoginData(data)
        loginUser()
        console.log(data)
    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%' }}>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sm={8} md={4} >
                        <Stack sx={{ width: '100%', marginTop: 3 }} spacing={2}>
                            {Object.keys(errorsForm).length > 0 && (
                                // Object.values(errorsForm).map(value => (
                                <Collapse in={open}>
                                    <Alert action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    } severity="error">{Object.values(errorsForm).map(value => <div key={value}>* {value}</div>)}</Alert>
                                </Collapse>
                                // ))
                            )}
                        </Stack>
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'start', height: '100%' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <h1 >Login</h1>
                        </div>

                        <InputLabel >Name:</InputLabel>
                        <TextField margin="normal" error={Boolean(errors.username)} helperText={errors.username?.message} variant="outlined" {...register("username")} type="text" placeholder="Name" />

                        <InputLabel>Password:</InputLabel>
                        <TextField margin="dense" error={Boolean(errors.password)} helperText={errors.password?.message} variant="outlined" {...register("password")} type="password" placeholder="Password" />

                        <LoadingButton
                            loading={loading ? loading : false}
                            loadingPosition="start"
                            startIcon={<VpnKeyRoundedIcon />}
                            variant="contained"
                            type="submit"
                            fullWidth
                            style={{ marginTop: 10, marginBottom: 10 }}
                        >
                            Login
                        </LoadingButton>
                    </div>
                </form>


            </div>
        </>
    );
};

const LOGIN_USER = gql`
    mutation login(
        $username: String!,
        $password: String!
    ){
        login(username: $username, password: $password){
            id email username createdAt token
        }
    }
`

export default Login;
