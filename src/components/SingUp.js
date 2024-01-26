import React, { useEffect, useState } from 'react';
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoMdEye } from 'react-icons/io';
import { FaEyeSlash } from 'react-icons/fa';
import imgBG from './singImg.png';
import userIcon from './icons/user.svg';
import mailIcon from './icons/mail.svg';
import lockIcon from './icons/lock.svg';
import './SingUp.css';

const SingUp = () => {
  const [checkStatus,setCheckStatus] = useState(localStorage.getItem("authorized"))//თუ ავტორიზებულია 
  const [errorMassige,setErrorMassiger] = useState('d-none')//ერორის შეტყობინება თავიდან დაფარულია
  const [value, setValue] = useState({ name: '', email: '', password: '' });
  const [statusResponse,setStatusresponse] = useState(false)
  const [statusTExt,setstatusTExt] = useState("")
  const [border, setBorder] = useState({
    username: 'feild d-flex',
    email: 'feild d-flex',
    password: 'feild d-flex',
  });
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [visible, setVisible] = useState(false);
  var [done, setDone] = useState(false);
  const [typeValuePasword, setTypevaluepasword] = useState('password');
  const navigate = useNavigate()//გადამისამაღთების ჰუკი
  useEffect(()=>{
          
          setTimeout(() => {
            if(statusResponse){
              navigate("/");
            }
          }, 2000);

},[statusResponse])
  function submitHandler(e, value) {
    e.preventDefault();
    if (done) {
      axios.post('https://apitest.reachstar.io/signup',value)
      .then(resposne => {//წამოიღე გადაგვზანილი მონაცემი
       
        if(resposne.status === 200){//თუ სტატუსი წარმატებულია მაშინ
          setStatusresponse(true)
          setstatusTExt("თქვენ წარმატებით დარეგისტრირდით ახლა გადამისამართდებით ავტორიზაციი გვერდზე")
          
        }
        if(resposne.status === 500){
          setstatusTExt("ასეთი მომხმარებელი უკვე არსებობს")
          
        }
      }).catch(error => {
        setErrorMassiger("errorDiv")
        setstatusTExt("ასეთი მომხმარებელი უკვე არსებობს")
        
      })
     
    }
  }
 ///dimaA123  dima@test.gmail.ru
  function onChangeHandler(e, name) {
    setValue({ ...value, [name]: e.target.value }); //ვალუე ობიექტი დაშალოს და
    //ნეიმი რომელ სახელსაც უდრის ჩაწეროს ვალუეში აკრეფილი ინფორმაცია

    var text = value[name].toString(); //ტექსტი უდრის რომელსაც ვკრეფავთ უსერს ან სხვა

    var nameRegex = {
      username: /^[a-zA-Z0-9]+$/,
      email:
      /^\S+$/,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    };
    if (text.match(nameRegex[name])) {
      //აკრეფილი ინუთის ვალუე (text) თუ უდრის ..
      ///..რეგექსი ობიექტის უსერნამეს ან სხვა ამ მომენტში რაც იკრიფება
      setBorder({ ...border, [name]: 'feild d-flex border border-success' });
      //ბორდერის ობიექტს დაემატოს კლასი გაწვანება
      //setDone(false)//შესრულება ჩავარდა
    }
    if (
      value.name.match(nameRegex.username) &&
      value.email.match(nameRegex.email) &&
      value.password.match(nameRegex.password)
    ) {
      //თუ ვალუე აკრეფილი ემთხვევა შესაბამის ყველა რეგექს მაშინ

      setDone(true); //შესრულება წარმატებულია
      
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
          <div className="col-md-12  p-0">
            <div className="singup__content">
              <h1 className="singup__Hello mb-4 pt-5">Hello Star!</h1>
              <form className="form" onSubmit={(e) => submitHandler(e, value)}>
                <div className={border.username}>
                  <div className="user-icon">
                    <img src={userIcon} />
                  </div>
                  <input
                    type="text"
                    value={value.name}
                    placeholder="Name"
                    required
                    onChange={(e) => onChangeHandler(e, 'name')}
                  />
                  <div className="password-icon"></div>
                </div>
                <div className={border.email}>
                  <div className="user-icon">
                    <img src={mailIcon} />
                  </div>
                  <input
                    type="email"
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
                    placeholder=" use Numbers, uppercase and lowercase symbols"
                    required
                    onChange={(e) => onChangeHandler(e, 'password')}
                  />
                  <div className="password-icon" onClick={changeIcon}>
                    {icon}
                  </div>
                </div>
             
                <div className="feild feild2  d-flex">
                  <input
                    type="submit"
                    className="submit-btn"
                    value="რეგისტრაცია"
                  />
                </div>
                <div className="feild feild2  d-flex">
                  <div className="sing-in">
                    Already registered?&nbsp;
                    <span className="sing-in-span">
                      <Link to="/">Sing in</Link>
                    </span>
                  </div>
                </div>
              </form>
              <h2 className="d-block fs-6">{statusTExt}</h2>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SingUp;
