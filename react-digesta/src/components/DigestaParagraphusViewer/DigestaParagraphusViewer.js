import classes from "./DigestaParagraphusViewer.module.css";
import { addTags } from "../../services/text.service";

import CommentsViewer from "../commentsViewer/CommentsViewer";

const DigestaParagraphusViewer = ({ paragraphus }) => {
  let paragraphusKey = null;
  if (paragraphus.key !== "pr") {
    paragraphusKey = paragraphus.key;
  }

  const latinText = addTags(paragraphus.text_lat);
  // const polText = addTags(paragraphus.text_pl)

  return (
    <>
      {paragraphusKey && <h2>Paragraphus {paragraphusKey}</h2>}
      <section className={classes.paragraph_text__container}>
        <div>{latinText}</div>
        {/*<div>{polText}</div>*/}
      </section>
      <section className={classes.paragraph_comments__container}>
        <CommentsViewer paragraphus_id={paragraphus.id} repliedId={null} />
      </section>
    </>
  );
};
export default DigestaParagraphusViewer;
