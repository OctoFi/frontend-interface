import Banner1 from '../assets/images/banners/banner_1.png';
import Banner2 from '../assets/images/banners/banner_2.png';
import Banner3 from '../assets/images/banners/banner_3.png';

export type BannerItem = {
    image: string;
    url: string;
}

export const BannerItems: Array<BannerItem> = [
    {
        image: Banner1,
        url: "https://den.octo.fi",
    },
    {
        image: Banner2,
        url: "https://dyor.octo.fi",
    },
    {
        image: Banner3,
        url: "https://doc.octo.fi",
    },
];
