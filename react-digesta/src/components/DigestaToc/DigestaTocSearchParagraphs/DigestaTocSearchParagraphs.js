import DigestaSearchViewer from "../../DigestaSearchViewer/DigestaSearchViewer";
import classes from "./DigestaTocSearchParagraphs.module.css";
import { useState } from "react";

const DigestaTocSearchParagraphs = ({ paragraphi, searchedTerm, lang }) => {
  // let results
  const [paragraphiSorted, setParagraphiSorted] = useState(false);
  const sortByAuthorHandler = () => {
    const sorted = [...paragraphi];
    sorted.sort((a, b) => a.lex.author.name.localeCompare(b.lex.author.name));
    setParagraphiSorted(sorted);
  };

  const sortByDigestaHandler = () => {
    setParagraphiSorted(paragraphi);
  };
  let paragraphs = paragraphi;
  if (paragraphiSorted) {
    paragraphs = paragraphiSorted;
  }

  const results = paragraphs.map((paragraphus) => (
    <DigestaSearchViewer
      key={paragraphus.id}
      paragraph={paragraphus}
      searchedTerm={searchedTerm}
      lang={lang}
    />
  ));

  return (
    <>
      <section className={classes.actions}>
        <button className={classes.button} onClick={sortByAuthorHandler}>
          Posortuj według jurystów
        </button>
        <button className={classes.button} onClick={sortByDigestaHandler}>
          Posortuj według układu Digestów
        </button>
      </section>
      {paragraphs.length > 0 && (
        <h1 className={classes.title}>
          Szukany tekst <span>- {searchedTerm} -</span> występuje{" "}
          {paragraphs.length} razy w następujących ustawach i paragrafach
        </h1>
      )}
      <ul className={classes.found_items}>
        {paragraphs.length > 0 && results}
      </ul>
    </>
  );
};

export default DigestaTocSearchParagraphs;
