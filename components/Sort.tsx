import styles from "../styles/Sort.module.css";

interface sortType {
  text: string;
  sort: string;
  changeSort: (text: string) => void;
  filterFood: (text: string) => void;
}

const Sort = ({ text, sort, changeSort, filterFood }: sortType) => {
  return (
    <div className={styles.sortContainer}>
      <div className={styles.sortText}>Sort by:</div>
      <div className={styles.sortButtonContainer}>
        <button
          type="button"
          className={`btn ${
            sort === "name" ? "btn-dark" : "btn-outline-dark"
          } ${styles.sortButton}`}
          onClick={() => changeSort("name")}
        >
          Name
        </button>
        <button
          type="button"
          className={`btn ${
            sort === "increasing" ? "btn-dark" : "btn-outline-dark"
          } ${styles.sortButton}`}
          onClick={() => changeSort("increasing")}
        >
          Ratings (Ascending)
        </button>
        <button
          type="button"
          className={`btn ${
            sort === "decreasing" ? "btn-dark" : "btn-outline-dark"
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
          onChange={(event) => filterFood(event.target.value)}
          className="form-control"
          placeholder="Filter"
        />
      </div>
    </div>
  );
};

export default Sort;
