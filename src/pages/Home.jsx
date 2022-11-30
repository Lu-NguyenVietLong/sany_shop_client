import React from 'react'

import Helmet from '../components/Helmet'
import Slider from '../components/Slider'
import Section, { SectionTitle, SectionBody } from "../components/Section"
import HomeTab from '../components/HomeTab'
import Button from '../components/Button'
import Grid from '../components/Grid'


const Home = () => {
  return (
    <Helmet title="Home">
        <Slider timeOut={6000}/>
        <Section>
          <SectionTitle>
            Mặc ngay, yêu luôn
          </SectionTitle>
          <SectionBody>
            <HomeTab/>
          </SectionBody>
        </Section>
        <Section>
          <SectionBody>
            <div className="home-demin">
              <div className="about--card">
                <div className="about--card__image">
                  <img src="https://mcdn.coolmate.me/image/August2022/mceclip0.jpg" alt="" />
                </div>
                <div className="about--card__content">
                  <h2 className="about--card__content__heading">
                    Sany
                    <br></br>
                    CLEAN DENIM
                  </h2>
                  <div className="about--card__content__des">
                    <p>
                        Một chiếc quần Jeans đầu tiên tại Coolmate được sử dụng chất liệu
                        là Cotton Tái sinh (Regenerative Cotton) - loại Cotton chất lượng và
                        trồng bằng quy trình sạch, bền vững. Chiếc quần với vải Denim được
                        dệt toàn bộ tại nhà máy Nhơn Trạch, Đồng Nai của Saitex - nhà máy
                        với nhiều trang máy móc, thiết bị hiện đại với quy trình sản xuất khép
                        kín, giảm thiểu CO2 và nước thải ra môi trường.
                    </p>
                  </div>
                  <Button
                    size='sm'
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>
            </div>
          </SectionBody>
        </Section>
        <Section>
          <div className="content--medium">
            <div className="content--medium__layout">
              <img src="https://mcdn.coolmate.me/image/November2022/mceclip2_68.png" alt=""/>
              <img src="https://mcdn.coolmate.me/image/November2022/mceclip0_33.png" alt="" className="image--scroll"/>
              <Button
                classTen="content--medium__layout__btn"
                
              >
                Khám phá
              </Button>
            </div>
          </div>
        </Section>
        <Section>
          <SectionBody>
            <div className="home-demin">
              <div className="about--card">
              <div className="about--card__content">
                  <h2 className="about--card__content__heading">
                    
                    Dòng sản phẩm công nghệ EXCOOL
                    <br></br>
                  </h2>
                  <div className="about--card__content__des">
                    <p>
                      Công nghệ Việt cho người Việt.
                      <br></br>
                      Với hơn <b>100.000</b> sản phẩm đã được gửi đến tay khách hàng sử dụng và hài lòng
                    </p>
                  </div>
                  <Button
                    size='sm'
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
                <div className="about--card__image">
                  <img src="https://mcdn.coolmate.me/uploads/January2022/ao_(1)_1_(1)_(1).jpg" alt="" />
                </div>
                
              </div>
            </div>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>
            <h1>Sany Basics</h1>
          </SectionTitle>
          <SectionBody>
            <div className="abouts__wrapper">
            <div class="abouts__wrapper__content">
                <div class="abouts__wrapper__content__box">
      
                  <img src="https://mcdn.coolmate.me/image/July2022/mceclip0_32.png" alt="Coolmate Basics 1" />
                  <img src="https://mcdn.coolmate.me/image/September2022/mceclip1_11.png" alt="Coolmate Basics 2"  />
                  <img src="https://mcdn.coolmate.me/uploads/January2022/CoolmateBasic3.png" alt="Coolmate Basics 3"  />
                  <img src="https://mcdn.coolmate.me/uploads/February2022/Mask_Group_(2).png" alt="Coolmate Basics 4"  />
                  <img src="https://mcdn.coolmate.me/uploads/January2022/CoolmateBasic4.png" alt="Coolmate Basics 5"  />
                </div>
              </div>
            </div>
          </SectionBody>
          <SectionTitle>Dòng sản phẩm mặc cơ bản chất lượng tốt và giá tốt của Coolmate</SectionTitle>
        </Section>
        <Section>
            <SectionBody>
              <Grid
                col = {4}
                mdCol = {4}
                smCol = {2}
                gap = {10}
              >
                <div>
                  <div className="thumnail">
                    <img src="https://mcdn.coolmate.me/image/June2022/mceclip0_43.jpg" alt="" />
                    <span>Đồ Mặc Trong</span>
                  </div>
                </div>
                <div>
                  <div className="thumnail">
                    <img src="https://mcdn.coolmate.me/image/June2022/mceclip1_56.jpg" alt="" />
                    <span>Đồ Mặc Trong</span>
                  </div>
                </div>
                <div>
                  <div className="thumnail">
                    <img src="https://mcdn.coolmate.me/image/June2022/mceclip0_99.jpg" alt="" />
                    <span>Mặc Hằng Ngày</span>
                  </div>
                </div>
                <div>
                  <div className="thumnail">
                    <img src="https://mcdn.coolmate.me/image/June2022/mceclip1_61.jpg" alt="" />
                    <span>Mặc Hằng Ngày</span>
                  </div>
                </div>
              </Grid>
            </SectionBody>
        </Section>
        <Section>
          <div className="home__caption">
          <marquee>
           <p> sanyShop- Ưu đãi nhiều hơn, mua sắm nhiều hơn. Nhận ngay 7%</p>
          </marquee>
          <a>
            Gia nhập ngay
          </a>
          </div>
        </Section>
        <Section>
          <div className="home__info">
            <div className="home__info__container">
              <div className="home__info__container__item">
                <img src="https://mcdn.coolmate.me/uploads/November2021/image1_59.jpg" alt=""/>
              </div>
              <div className="home__info__container__item">
                <img src="https://mcdn.coolmate.me/uploads/November2021/image2.jpg" alt="" />
              </div>
            </div>
          </div>
        </Section>
    </Helmet>
  )
}

export default Home