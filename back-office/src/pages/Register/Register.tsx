import React, { useState } from 'react';
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useAuthContext } from '../../contexts/AuthContext';
import InputText from '../../components/atoms/InputText/InputText';
import Button from '../../components/atoms/Button/Button';
// import InputGroupCheckbox from '../../components/atoms/InputGroupCheckbox/InputGroupCheckbox';

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    // const [selectedFile, setSelectedFile] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [passwordIsOK, setPasswordIsOK] = useState<false | true | null>(null);
    const [instrumentList, setInstrumentList] = useState(['Violon']);
    const [selectedInstruments, setSelectedInstruments] = useState('');
    const [successRegister, setSuccessRegister] = useState<false | true | null>(null);
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole, setUserId ,usersService } = useAuthContext();

    // const allRegExp = {
    //     email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    //     firstname: /^[a-zA-ZÀ-ÿ'\- ]+$/,
    //     lastname: /^[a-zA-ZÀ-ÿ'\- ]+$/
    // }

    const handleSubmit = async (e :any) => {

      e.preventDefault();

      const usersData  = {
          "firstName": firstname,
          "lastName": lastname,
          "username": firstname +' ' +lastname,
          "email": email,
          "password": password,
          "instruments": instrumentList,
      };

      const response = await usersService.register(usersData) ;

      if (response && response.token !== '' && response.token !== undefined) {
            localStorage.setItem('jwt', JSON.stringify(response.token));
            setIsAuthenticated(true);
            let jwtDecoded :any = jwt_decode(response.token);
            setUserId(jwtDecoded.username);        
            setUserRole(jwtDecoded.roles);
            navigate("/homepage");
        } else {
            console.log("Le Token Register est vide");
        }
    }



    // const handleNameChange = (event :any , key :any) => {
    //     const isValidPattern = allRegExp[key].test(event);
    //     if ( key === 'firstname'){
    //         setFirstname({ value: event, isValid: isValidPattern  });
    //     } else if(key === 'lastname' ) {
    //         setLastname({ value: event, isValid: isValidPattern  });
    //     } else if(key === 'email' ) {
    //         setEmail({ value: event, isValid: isValidPattern  });
    //     };
    // };

    // const handlepassword = (event :any) => {
    //     setPassword(event);
    //     let checkData = event.search(new RegExp('^' + passwordVerification + '$', "g"));
    //     if( checkData !== -1 ){
    //         setPasswordIsOK(true);
    //     } else {
    //         setPasswordIsOK(false);
    //     }
    // }

    // const handlePasswordVerification = (event :any) => {
    //     setPasswordVerification(event);
    //     let checkData = password.search(new RegExp('^' + event + '$', "g"));
    //     if( checkData !== -1 ){
    //         setPasswordIsOK(true);
    //     } else {
    //         setPasswordIsOK(false);
    //     }
    
    // }

    // useEffect(() => {
    //     const displayInstruments = async () => {
    //       try {
    //           const response = await axios.get(process.env.REACT_APP_API_URL + `/instruments`);
    //           const dataInstruments = await response.data;
    //           let instrumentUserList = [];
    //           for (let i = 0; i < dataInstruments.length; i++) {
    //             const instrument = dataInstruments[i];
    //             const instrumentName = instrument.name;
    //             instrumentUserList.push(instrumentName);
    //           };
    //           setInstrumentList(instrumentUserList);
    //       } catch (error) {
    //           console.error(error);
    //       };
    //     }
    //     displayInstruments();
        
    //   }, [password ,passwordVerification ,passwordIsOK])


    return (
        <div className="form-register" >
            <form className='mx-auto' onSubmit={ handleSubmit }>
            <h1> Inscription </h1>
            <div className="mb-3">   
                <InputText 
                    label= {"Prénom"}   
                    value={firstname} 
                    onChange={(e) => setFirstname(e.target.value)} 
                    name="firstname"
                    placeholder={"Prénom"} 
                    isRequired= {true}
                />
            </div> 
            <div className="mb-3">
                <InputText 
                    label= {"Nom"}   
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    name="lastname"
                    placeholder={"Nom"} 
                    isRequired= {true}
                />
            </div>
            <div className="mb-3">
                <InputText 
                    label= {"Email"}   
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    name="email"
                    placeholder={"Email"} 
                    isRequired= {true}
                />

            </div>
            <div className="mb-3">
            {/* <InputGroupCheckbox
                options={instrumentList}
                selectedOptions={selectedInstruments}
                labelCheckboxGroup="Instruments"
                onChange={(selected :any) => setSelectedInstruments(selected)}
            /> */}
            </div>
            <div className="mb-3">

                <InputText 
                    label= {"Mot de passe"}   
                    value={password} 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder={"Mot de passe"} 
                    isRequired= {true}
                    errorText={ passwordIsOK === false && ( passwordVerification !== "" && password !== "")  ? "Le mot de passe de vérification ne correspond pas" : ""}
                />

            </div>
            {/* <div className="mb-3">
                <InputText 
                    label= {"Vérifier le mot de passe"}   
                    value={passwordVerification} 
                    type="password"
                    onChange={(e :any) => setPasswordVerification(e.target.value)} 
                    placeholder={"Vérifier le mot de passe"} 
                    isRequired= {true}
                    errorText={ passwordIsOK === false && ( passwordVerification !== "" && password !== "") ? "Le mot de passe de vérification ne correspond pas" : ""}
                />
            </div> */}
     
            <div className="mb-3"> 
              <Button type="submit" kind={'primary'} stylesBtn="mb-3">
                S'inscrire
              </Button>
            </div>


            <p className="link-btn">Vous avez déjà un compte ?  <Link  to="/login"> Se connecter </Link> </p>
            </form>
            {successRegister !== null && successRegister === false && (
                <div className={successRegister !== null && successRegister === false ? 'form-arror-msg show' : 'form-arror-msg hidden'}>
                <p>Les informations saisies ne nous permettent pas de vous inscrire.<br/> Veuillez recommencer.</p>
            </div>
            )}
        </div>
       
    )
}
 export default Register;