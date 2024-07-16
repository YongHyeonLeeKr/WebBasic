import { useRouter } from 'next/router';
import LayoutBanner from './banner';
import LayoutFooter from './footer';
import LayoutHeader from './header';
import LayoutNavigation from './navigation';

const HIDDEN_HEADERS = [
    '/section13/13-01-library-icon'
    //..
    //..
]


interface ILayoutProps {
    children: JSX.Element;
}


export default function Layout (props: ILayoutProps):JSX.Element {

    const router = useRouter();
    console.log("_______")
    console.log(router.asPath);
    console.log("_______")

    const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath)

    return (
    <>
        {!isHiddenHeader && <LayoutHeader />} 
        <LayoutBanner />
        <LayoutNavigation />
        <div style={{ height: '500px', display: 'flex'}}>    
        
            <div style={{width: '30%', background: 'orange'}}> 사이드 바</div>
            <div style={{ width: '70%', background: 'green'}}> {props.children} </div>
        
        </div>
        <LayoutFooter />        
    </>
    )
}
