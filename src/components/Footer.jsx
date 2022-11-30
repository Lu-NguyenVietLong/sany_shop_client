import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/sany-logo.png'

import { Icon } from '@iconify/react';

const footerAboutLinks = [
  {
    display: 'Câu chuyện về Sany Shop',
    path: '/about'
  },
  {
    display: 'Nhà máy',
    path: '/about'
  },
  {
    display: 'SanyClub',
    path: '/about'
  },
  {
    display: 'Care&Share',
    path: '/about'
  },
]

const footerRecruitLinks = [
  {
    display: 'Tuyển dụng',
    path: '/about'
  },
  {
    display: 'Đăng kí bản quyển',
    path: '/about'
  },
]

const sany = [
  {
    display: 'Áo polo',
    path: '/about'
  },
  {
    display: 'Áo T-shirt',
    path: '/about'
  },
  {
    display: 'Áo sơ mi',
    path: '/about'
  },
  {
    display: 'Quần',
    path: '/about'
  },
  {
    display: 'Quần lót',
    path: '/about'
  },
  {
    display: 'Tất (Vớ)',
    path: '/about'
  },
  {
    display: 'Mũ (Nón)',
    path: '/about'
  },
  {
    display: 'Phụ kiện khác',
    path: '/about'
  },
]

const customer = [
  {
    display: 'Hỏi đáp-FAQs',
    path: ''
  },
  {
    display: 'Chính sách đổi trả 60 ngày',
    path: ''
  },
  {
    display: 'Liên hệ',
    path: ''
  },
  {
    display: 'Thành viên Coolclub',
    path: ''
  },
  {
    display: 'Khách hàng hài lòng 100%',
    path: ''
  },
  {
    display: 'Chính sách khuyến mãi',
    path: ''
  },
  {
    display: 'Chính sách giao hàng',
    path: ''
  },

]




const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid
          col={4}
          mdCol={2}
          smCol={10}
        >
          <div>
            <div className="footer__title">Khám phá Sany Shop</div>
            <div className="footer__content">
              {
                sany.map((item, index) => (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                ))
              }
            </div>
          </div>
          <div>
            <div className="footer__title">Dịch vụ khách hàng</div>
            <div className="footer__content">
            {
                customer.map((item, index) => (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                ))
              }
              <div className="footer__title">Kiến thức làm đẹp</div>
              <div className="footer__content"><p>Hướng dẫn chọn Size</p></div>
              <div className="footer__content"><p>Blog</p></div>
              <div className="footer__content"><p>Group mặc đẹp sống chất</p></div>
            </div>
              
          </div>
          <div>
            <div className="footer__title">Địa chỉ liên hệ</div>
                <div className="footer__content"><p>HUB Hà Nội: Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội</p></div>
                <div className="footer__content"><p>HUB Tp HCM: Lầu 1, Số 163 Trần Trọng Cung, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh</p></div>
          </div>
          <div>
              <div className="footer__title">SANY SHOP lắng nghe bạn</div>
              <div className="footer__title">Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</div>
              <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        
              </div>
              <div className="footer__social">
                <Icon icon="akar-icons:facebook-fill" className="icon__social"/>
                <Icon icon="akar-icons:youtube-fill" className="icon__social" />
                <Icon icon="akar-icons:tiktok-fill" className="icon__social" />
              </div>
          </div>
        </Grid>
      </div>
    </footer>
  )
}

export default Footer