import React, { useEffect, useState,  } from 'react';
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoMdEye } from 'react-icons/io';
import { FaEyeSlash } from 'react-icons/fa';
import imgBG from './singImg.png';
import userIcon from './icons/user.svg';
import mailIcon from './icons/mail.svg';
import lockIcon from './icons/lock.svg';
import './SingUp.css';


const SingIn = () => {
  const  [data,setData] = useState({})
  const location = useLocation()
  const navigate = useNavigate()//გადამისამაღთების ჰუკი
  const [value, setValue] = useState({email: '', password: '' });//ინფუთების ვალუეები
  const [border, setBorder] = useState({//ბორდერი დანგერის დივები
    username: 'feild d-flex',
    email: 'feild d-flex',
    password: 'feild d-flex',
  });
  const [icon, setIcon] = useState(<FaEyeSlash />);////ფაროლის დამალვის იქონო
  const [visible, setVisible] = useState(false);
  var [done, setDone] = useState(false);//სანამ ფალსეა მანამ არ შემოწმდება და გაიგზავნება სერვერზე ინფუთების ინფო
  const [typeValuePasword, setTypevaluepasword] = useState('password');//პაროლი ან ტექსტი იყო ან პაროლი 

  const [checkStatus,setCheckStatus] = useState(localStorage.getItem("authorized"))//თუ ავტორიზებულია 
  const [errorMassige,setErrorMassiger] = useState('d-none')//ერორის შეტყობინება თავიდან დაფარულია
  useEffect(()=>{
    if(checkStatus ==="true"){//თუ მომხმარებელი აბვტორიზებულია
        navigate("/");//მაშინ გადამამისამართე დაშბოარდზე
      }//თუ ლოკალში ჩაწერილი ინფო არის ჭეშმარიტება მაშინ გადამამისამართე დაშბორდზე
  },[checkStatus])
  function submitHandler(e,value) {//ფუნქცია რომელიც აგზავნის უზერის მონაცემებს სერვერზე
    e.preventDefault();
    if (done) {//თუ სტატუსი დონე თრუეა მაშნ სერვერზე გააგზავნე
    
      axios.post('https://apitest.reachstar.io/signin',value)
      .then(resposne => {//წამოიღე გადაგვზანილი მონაცემი
       
        if(resposne.status === 200){//თუ სტატუსი წარმატებულია მაშინ
          localStorage.setItem("authorized",done)//ლოკალში დამიმახსოვრე სტატუსი 
          localStorage.setItem("userInfo",value.email)//ასევე მისალმებისათვის ჩამიწერე მეილი
          setCheckStatus(localStorage.getItem("authorized"))//სტატუს მიანიჭე უკვე თრუე ავტორიზებული
         
        }
        if(resposne.status === 500){
         
        }
      }).catch(error => {
        setErrorMassiger("errorDiv")

      })
    }//ვინახავ მონაცემს ლოკალში
  }

  function onChangeHandler(e, name) {
    setValue({ ...value, [name]: e.target.value }); //ვალუე ობიექტი დაშალოს და
    
    //ნეიმი რომელ სახელსაც უდრის ჩაწეროს ვალუეში აკრეფილი ინფორმაცია
    var text = value[name].toString(); //ტექსტი უდრის რომელსაც ვკრეფავთ უსერს ან სხვა
    var nameRegex = {
      username: /^[a-zA-Z0-9]+$/,
      email:
      /^\S+$/,
      password: /[a-zA-Z\-\'\ ]/i,
    };
    if (text.match(nameRegex[name])) {
      //აკრეფილი ინუთის ვალუე (text) თუ უდრის ..
      ///..რეგექსი ობიექტის უსერნამეს ან სხვა ამ მომენტში რაც იკრიფება
      setBorder({ ...border, [name]: 'feild d-flex border border-success' });
      //ბორდერის ობიექტს დაემატოს კლასი გაწვანება
      //setDone(false)//შესრულება ჩავარდა
    }
    if (
      value.password.match(nameRegex.password)
    ) {
      //თუ ვალუე აკრეფილი ემთხვევა შესაბამის ყველა რეგექს მაშინ
      setDone(true); //შესრულება წარმატებულია
      setData({email:value.email,password:value.password})
     
    }
    if (!text.match(nameRegex[name])) {
      //თუ აკრეფილი ტექსტი არ ემთხვევა რეგექსს მაშინ დესტრუქტურიზაცია გააკეთე ბორდერის
      //და ბორდერში კონკრეტულ სახელის თვისებას გადააწერე დანგერი
      setBorder({ ...border, [name]: 'feild d-flex border border-danger' });
      setDone(false);
    }
  }
  function changeIcon() {
    //პაროლის იქონის შეცვლა
    setVisible(!visible); //თუ ფალსეა გახადე თრუე თუ თრუეა გახადე ფალსე
    setIcon(visible ? <FaEyeSlash /> : <IoMdEye />); //თუ თრუეა ჩასვი ერთი ფოტო თუ არადა მეორე
    setTypevaluepasword(visible ? 'password' : 'text'); //ასევე თუ თრუეა ტაიპი ინფუთის ველის შესაბამისად გადააკეთე
  }

  return (
    <div className="singup">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="singup__content">
              <h1 className="singup__Hello mb-4 pt-5">Hello Star!</h1>
              <form className="form" onSubmit={(e) => submitHandler(e,value)}>
                <div className={border.email}>
                  <div className="user-icon">
                    <img src={mailIcon} />
                  </div>
                  <input
                    type="email" required
                    name="email"
                    value={value.email}
                    placeholder="Email"
                    onChange={(e) => onChangeHandler(e, 'email')}
                  />
                  <div className="password-icon"></div>
                </div>
                <div className={border.password}>
                  <div className="user-icon">
                    <img src={lockIcon} />
                  </div>
                  <input
                    type={typeValuePasword}
                    name="password"
                    value={value.password}
                    placeholder="Password"
                    required
                    onChange={(e) => onChangeHandler(e, 'password')}
                  />
                  <div className="password-icon" onClick={changeIcon}>
                    {icon}
                  </div>
                  <div className={errorMassige}>უსერი ან მეილი არ არსებობს </div>
                </div>

                <div className="feild feild2  d-flex">
                  <input
                    type="submit"
                    className="submit-btn"
                    value="ავტორიზაცია" 
                  />
                </div>
                <div className="feild feild2  d-flex">
                  <div className="sing-in">
                    Not registered?&nbsp;
                    <span className="sing-in-span">
                      <Link to="/SingUp">Sing Up</Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingIn;
