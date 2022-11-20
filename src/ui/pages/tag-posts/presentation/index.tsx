export const useCreateProps = () => {
    return {
        topTitle,
        topMenu,
    };
};

// export interface TemplateProps {
//     // listOfPosts: any;
//     // setListOfPosts: any;
//     test: any;
// }

type TopTitle = {
    title: string;
};
type TopMenu = {
    buttonLabels: {
        menu1: string;
        menu2: string;
        menu3: string;
    };
};
// 自分が画面userをフォローしているかどうか
// 画面のuserがフォローしている人数　＋　画面のuserのフォロワー
// const [listOfPosts, setListOfPosts] = useState<any>([]);
const topTitle: TopTitle = {
    title: "トップタイトル",
};
const topMenu: TopMenu = {
    buttonLabels: {
        menu1: "トップメニュー1",
        menu2: "トップメニュー2",
        menu3: "トップメニュー3",
    },
};

// const mainProps: TemplateProps = {
//     test,
// };
