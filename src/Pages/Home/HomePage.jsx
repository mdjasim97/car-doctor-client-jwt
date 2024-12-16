
import Banner from './Banner/Banner';
import About from './About/About';
import Services from './Services/Services';
import Products from './Products/Products';
import Contact from './Contact/Contact';
import Team from './Team/Team';

const HomePage = () => {
    return (
        <div>
            <Banner />
            <About/>
            <Services/>
            <Contact/>
            <Products/>
            <Team/>
        </div>
    );
};

export default HomePage;