// Application General Configuration Values
export default configs = {
    authentication: {
        sign_in_callback: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/auth/success',
        sign_out_callback: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080',
        cognito_client_id: "52hjjvomou60c0fl7u0slbl85b",
        cognito_domain: "https://us-west-2gs5pcowrs.auth.us-west-2.amazoncognito.com",
    },
}
