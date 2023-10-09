import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "IGotYou";
  }, []);

  return (
    <section className="px-8">
      <h1>HOME CONTENT</h1>
    </section>
  );
}

export default Home;
