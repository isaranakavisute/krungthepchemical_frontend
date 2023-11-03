import BurgerNav from '../components/burger-bar'
import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import NavBar from '../components/navbar';
import RefundPolicy from '../components/refund-policy';
import Footer from '../components/footer';
import Contact from '../components/contact';

const RefundPage = () => {

    return (
        <>
            <MiniHeader />
                <OptionBar />
            <div className="sticky top-0 z-50">
                <NavBar />
                <BurgerNav />
            </div>
            <RefundPolicy />
            <Contact />
            <Footer />
        </>
    )
}

export default RefundPage