import About from '@components/About';
import Projects from '@components/Projects';

export default async function Home() {
  return (
    <>
      <About />
      <div className="pb-12">
        <Projects />
      </div>
    </>
  );
}
