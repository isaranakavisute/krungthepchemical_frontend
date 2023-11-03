import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import NavBar from '../components/navbar';
import BlogContainer from '../components/blog-container';
import Contact from '../components/contact';
import Footer from '../components/footer';
import BurgerNav from '../components/burger-bar';

const BlogPage = () => {

    return (
        <>
            <MiniHeader />
                <OptionBar />
            <div className="sticky top-0 z-50">
                <NavBar />
                <BurgerNav />
            </div>
            <BlogContainer />
            <Contact />
            <Footer />
        </>
    )
}

export default BlogPage