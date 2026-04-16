import About from '@components/About';
import Projects from '@components/Projects';
import Footer from '@components/Footer';

export default async function Home() {
  return (
    <>
      <About />
      <div className="pb-12">
        <Projects />
      </div>
      <Footer />
    </>
  );
}
