import styles from "../styles/Sort.module.css";
import { Color } from "../types";
interface sortType {
  text: string;
  sort: string;
  changeSort: (text: string) => void;
  filterData: (text: string) => void;
  theme: Color;
}

const Sort = ({ text, sort, changeSort, filterData, theme }: sortType) => {
  return (
    <div className={styles.sortContainer}>
      <div className={`${styles.sortText} text-${theme.textColor}`}>
        Sort by:
      </div>
      <div className={styles.sortButtonContainer}>
        <button
          type="button"
          className={`btn ${
            sort === "name"
              ? `btn-${theme.buttonColor}`
              : `btn-outline-${theme.buttonColor}`
          } ${styles.sortButton}`}
          onClick={() => changeSort("name")}
        >
          Name
        </button>
        <button
          type="button"
          className={`btn ${
            sort === "increasing"
              ? `btn-${theme.buttonColor}`
              : `btn-outline-${theme.buttonColor}`
          } ${styles.sortButton}`}
          onClick={() => changeSort("increasing")}
        >
          Ratings (Ascending)
        </button>
        <button
          type="button"
          className={`btn ${
            sort === "decreasing"
              ? `btn-${theme.buttonColor}`
              : `btn-outline-${theme.buttonColor}`
          } ${styles.sortButton}`}
          onClick={() => changeSort("decreasing")}
        >
          Ratings (Descending)
        </button>
      </div>
      <div className={styles.inputContainer}>
        <input
          id="name"
          type="text"
          value={text}
          onChange={(event) => filterData(event.target.value)}
          className="form-control"
          placeholder="Filter"
        />
      </div>
    </div>
  );
};

export default Sort;
