import { Link, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import Cookies from 'js-cookie'

function Auth() {

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const init = async () => {
            const value = searchParams.get('accessToken')
            Cookies.set('bv_aT', value)
            let redirectUrl = searchParams.get('redirectUrl') ? searchParams.get('redirectUrl') : "/"
            window.location.href = redirectUrl
        }
        init();
      }, []);

    return;
}

export default Auth