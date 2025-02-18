interface EndpointsProps {
    [key: string]: string,
}

const endpoints:EndpointsProps = {
    baseUrl: 'https://mycmy3pzp2.execute-api.us-west-2.amazonaws.com/Stage/energy',
    'gen-s3-url': '/gen-upload-url',
    history: '/history',
    input: '/input',
    summary: '/summary',
    upload: '/upload',
}

export default endpoints;
