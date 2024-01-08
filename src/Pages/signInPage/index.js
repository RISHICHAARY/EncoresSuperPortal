import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { fetchApi } from '../../API';

const baseURL = "https://anxious-toad-earmuffs.cyclic.app/api/";

function SignIn() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');


    const Navigate = useNavigate();

    const [ pageState,setPageState ] = useState({
        isLoading:false,
        isAuthorised:false,
        data:""
    });

    const [ formData,setFormData ] = useState({
        userName: "",
        passWord: ""
    });

    const [ formDataValidation,setFormDataValidation ] = useState({
        userName: null,
        passWord: null
    });

    const loginUser = async() =>{
        
        /*try{
            setPageState( (prev)=>({...prev,isLoading:true}) );
            const response = await fetchApi({
                method: "post",
                url: "logging/loginUser",
                redirect: 'follow',
                
                headers: "Content-Type': 'application/json",
                data:{ userName: formData.userName, passWord: formData.passWord }
            })

            console.log(response);
            setPageState( (prev)=>({...prev,isLoading:false}) );
        }catch(err){
            console.log(err)
        }*/
        Axios.post(`${baseURL}logging/loginUser`, {withCredentials: true}, { userName: formData.userName, passWord: formData.passWord }).then( (response) =>{
            console.log(response);
            setPageState( (prev)=>({...prev,isLoading:false}) );
        } );
    };

    const handleChange = (event) =>{
        
        const { name,value } = event.target;
        setFormData( (prev)=>({ ...prev,[name]:value }) );
        setFormDataValidation( (prev)=>({ ...prev,[name]:null }) );

    }

    const handleValidation = () =>{

        let inValid = false;

        if(formData.userName === ""){
            inValid = true;
            setFormDataValidation( (prev)=>({ ...prev,userName:"Please enter username." }) );
        }
        if(formData.passWord === ""){
            inValid = true;
            setFormDataValidation( (prev)=>({ ...prev,passWord:"Please enter passWord." }) );
        }

        return inValid;
    }

    const handleSubmit = (event) =>{

        event.preventDefault();

        if(!handleValidation()){
            loginUser()
        }

    }

    useEffect( ()=>{
       
        setPageState( (prev)=>({...prev,isLoading:true}) );
        Axios.post(`${baseURL}logging/cookieVerification`, {withCredentials: true}).then( (response)=>{
            console.log(response.data);
            if(response.data.errorCode !== undefined){
                setPageState( (prev)=>({...prev,isAuthorised:false}) );
                setPageState( (prev)=>({...prev,isLoading:false}) );
            }
            else{
                localStorage.setItem("loggedUser",response.data.data);
                setPageState( (prev)=>({...prev,isLoading:true}) );
                Navigate('/Dashboard');
            }
        } );

    },[] );

    if( pageState.isLoading ){
        return(
            <div>
                Loading...
            </div>
        )
    }
    else if( !pageState.isAuthorised ){
        return (
            <div>
                <form onSubmit={ (event)=>{ handleSubmit(event) } }>
                    <input type="email" name="userName" value={formData.userName} onChange={ (event)=>{ handleChange(event) } } />
                    <input type="password" name="passWord" value={formData.passWord} onChange={ (event)=>{ handleChange(event) } } />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default SignIn;
