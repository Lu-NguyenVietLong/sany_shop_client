import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Grid from '../components/Grid'
import { useSelector } from 'react-redux'
import { selectAuth } from '../redux/user/userSlice'
import axios from 'axios';


const InfoUser = props => {

    
    const {user} = useSelector(selectAuth)

    const [tinhList, setTinhList] = useState();
    const [tinh, setTinh] = useState();
    const [huyenList, setHuyenList] = useState();
    const [huyen, setHuyen] = useState();
    const [xaList, setXaList] = useState();
    const [xa, setXa] = useState();
    
    const [activeSex, setActiveSex] = useState('male');


    const handleCheckSex = (sex) => setActiveSex(sex)

    const handleUpdateHuyen = (e) => {
        setTinh(e.target.value)
        const huyentemp = tinhList.find((tinhs) => tinhs.name === e.target.value);
        setHuyenList(huyentemp.districts);
    };

    const handleUpdateXa = (e) => {
        setHuyen(e.target.value)
        const xatemp = huyenList.find((huyens) => huyens.name === e.target.value);
        setXaList(xatemp.wards);
    };

    const handleUpdateXaItem = e => {
        setXa(e.target.value)
    }


    useEffect(() => {
        const fetchAddress = async () => {
            await axios
                .get(`https://provinces.open-api.vn/api/?depth=3`)
                .then((res) => {
                    const data = res.data;
                    console.log('Address', data);
                    setTinhList(data);
                })
                .catch((error) => console.log(error));
        };
        fetchAddress();
    }, []);


  return (
    <div className='info-input'>
        <div className='info-input__item'>
                <div className='info-input__item__title'><span>Họ tên</span></div>
                <input className='info-input__item__ip' />
        </div>
        
        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Email</span></div>
            <input type="email" value={user.email} className='info-input__item__ip' />
        </div>

        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Số điện thoại</span></div>
            <input className='info-input__item__ip' />
        </div>

        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Địa chỉ</span></div>
            <input className='info-input__item__ip' />
        </div>

        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Tỉnh thành</span></div>
            <div className='info-input__item__select'>
                <select onChange={(e) => handleUpdateHuyen(e)}>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {tinhList ? (
                        tinhList.map((Tinh) => (
                            <option key={Tinh.code} value={Tinh.name}>
                                {Tinh.name}
                            </option>
                        ))
                    ) : (
                        <option></option>
                    )}
                </select>
                <select onChange={(e) => handleUpdateXa(e)}>
                    <option>Chọn Quận/Huyện</option>
                    {huyenList ? (
                        huyenList.map((huyen) => <option value={huyen.name}>{huyen.name}</option>)
                    ) : (
                        <option></option>
                    )}
                </select>
                <select onChange={e=>handleUpdateXaItem(e)}>
                    <option>Chọn Phường/Xã</option>
                    {xaList ? (
                        xaList.map((xa) => <option value={xa.name}>{xa.name}</option>)
                    ) : (
                        <option></option>
                    )}
                </select>
            </div>
        </div>

        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Giới tính</span></div>
            <div className='info-input__item__radio'>
                <div><input type='radio' checked={`${activeSex=== 'male' ? 'checked' : ''}`} onClick={()=>handleCheckSex('male')} ></input><span>Nam</span></div>
                <div><input type='radio' checked={`${activeSex === 'female' ? 'checked' : ''}`} onClick={()=>handleCheckSex('female')}></input><span>Nữ</span></div>
            </div>
        </div>
        
        <div className='info-input__item'>
            <div className='info-input__item__title'><span>Ngày tháng năm sih</span></div>
            <input type='date' className='info-input__item__ip' />
        </div>
    </div>
  )
}

InfoUser.propTypes = {}

export default InfoUser