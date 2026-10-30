import Profile from '../assets/images/profile.jpg';
import illust01 from '../assets/images/illustration/item01.jpg';
import illust02 from '../assets/images/illustration/item02.jpg';
import illust03 from '../assets/images/illustration/item03.jpg';
import illust04 from '../assets/images/illustration/item04.jpg';
import illust05 from '../assets/images/illustration/item05.jpg';
import illust06 from '../assets/images/illustration/item06.jpg';
import illust07 from '../assets/images/illustration/item07.jpg';
import illust08 from '../assets/images/illustration/item08.jpg';
import illust09 from '../assets/images/illustration/item09.jpg';
import illust010 from '../assets/images/illustration/item010.jpg';

export const site = {
  title: "らくね",
  description: "らくねのポートフォリオサイト",
  profile: {
    name: "らくね",
    job: "illustrator",
    bio: "フリーランスでイラストレーターやってます。",
    profileImage: Profile,
    profileImageAlt: "",
  },
  illustration: [
    { id: 1,  title: "イラスト１", image: illust01,  alt: "" },
    { id: 2,  title: "イラスト２", image: illust02,  alt: "" },
    { id: 3,  title: "イラスト３", image: illust03,  alt: "" },
    { id: 4,  title: "イラスト４", image: illust04,  alt: "" },
    { id: 5,  title: "イラスト５", image: illust05,  alt: "" },
    { id: 6,  title: "イラスト６", image: illust06,  alt: "" },
    { id: 7,  title: "イラスト７", image: illust07,  alt: "" },
    { id: 8,  title: "イラスト８", image: illust08,  alt: "" },
    { id: 9,  title: "イラスト９", image: illust09,  alt: "" },
    { id: 10, title: "イラスト１０", image: illust010, alt: "" },
  ],
}