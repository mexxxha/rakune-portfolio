import Logo from '../assets/logo.png';
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
  logo: {
    logoImg: Logo,
    logoAlt: "らくね",
  },
  profile: {
    name: "らくね",
    job: "illustrator",
    bio: "フリーランスでイラストレーターやってます。",
    profileImg: Profile,
    profileImgAlt: "らくねのアイコン",
  },
  illustration: [
    { id: 1,  title: "", image: illust01,  alt: "" },
    { id: 2,  title: "", image: illust02,  alt: "" },
    { id: 3,  title: "", image: illust03,  alt: "" },
    { id: 4,  title: "", image: illust04,  alt: "" },
    { id: 5,  title: "", image: illust05,  alt: "" },
    { id: 6,  title: "", image: illust06,  alt: "" },
    { id: 7,  title: "", image: illust07,  alt: "" },
    { id: 8,  title: "", image: illust08,  alt: "" },
    { id: 9,  title: "", image: illust09,  alt: "" },
    { id: 10, title: "", image: illust010, alt: "" },
  ],
  nav: [
    { id: "profile", label: "プロフィール", kana: "ぷろふぃーる", icon: "pinhead:pixel-person" },
    { id: "works", label: "イラスト", kana: "いらすと", icon: "pixelarticons:images" },
    { id: "contact", label: "お問い合わせ", kana: "おといあわせ", icon: "pinhead:pixel-envelope" },
  ],
  social: [
    { label: "いんすたぐらむ", href: "#", icon: "pixelarticons:instagram" },
    { label: "ついったー", href: "#", icon: "pixelarticons:x" },
    { label: "ゆーちゅーぶ", href: "#", icon: "pixelarticons:youtube-solid" },
  ],
}