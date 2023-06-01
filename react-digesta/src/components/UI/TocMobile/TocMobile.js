import classes from "./TocMobile.module.css";

const TocMobile = ({ onOption, children }) => {
  return (
    <select id="toc" className={classes.toc} onChange={onOption}>
      {children}
    </select>
  );
};

export default TocMobile;
