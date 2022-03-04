import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Form.module.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormPage: NextPage = ({
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const notify = () =>
    toast.success("🍽️ Adding your Food to the FoodList", {
      position: "bottom-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className={styles.container}>
      <h1 className="display-1 text-center mb-5">Form for {params.formId}</h1>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form
        onSubmit={handleSubmit((data) => {
          const id = new Date().getTime();
          const formData = {
            id: id,
            description: data.description,
            rating: data.rating,
            name: data.name,
            image: data.image,
          };

          const storedFood = sessionStorage.getItem("Food");
          if (storedFood === null) {
            const newFood = [];
            newFood.push(formData);
            sessionStorage.setItem(`${params.formId}`, JSON.stringify(newFood));
          } else {
            const parsedStoredFood = JSON.parse(storedFood);
            sessionStorage.setItem(
              `${params.formId}`,
              JSON.stringify([...parsedStoredFood, formData])
            );
          }

          notify();
          setTimeout(() => {
            router.push(`/${params.formId}`);
          }, 5000);
        })}
      >
        <div className="form-group form-container mb-3">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <input
            className={`form-control ${
              errors.name?.type === "required" && "is-invalid"
            }`}
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <small className="form-text text-danger">* Name is required</small>
          )}
        </div>
        <div className="form-group form-container mb-3">
          <label htmlFor="image" className="mb-1">
            Image Url
          </label>
          <input
            type="url"
            className={`form-control ${
              errors.image?.type === "required" && "is-invalid"
            } ${errors.image?.type === "checkUrl" && "is-invalid"}`}
            {...register("image", {
              required: "Image is required",
              validate: {
                checkUrl: (url) => {
                  if (url.toLowerCase().includes("unsplash.com", 0)) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
            })}
          />
          {errors.image?.type === "required" && (
            <small className="form-text text-danger">* Image is required</small>
          )}
          {errors.image?.type === "checkUrl" && (
            <small className="form-text text-danger">
              * Only{" "}
              <a className="link-info" href="https://unsplash.com/">
                Unsplash
              </a>{" "}
              Images are available
            </small>
          )}
        </div>
        <div className="form-group form-container mb-3">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            className={`form-control ${
              errors.description?.type === "required" && "is-invalid"
            }`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description?.type === "required" && (
            <small className="form-text text-danger">
              * Description is required
            </small>
          )}
        </div>
        <div className="form-group form-container mb-3">
          <label htmlFor="rating" className="mb-1">
            Rating (1-5)
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.rating?.type === "required" && "is-invalid"
            } ${errors.rating?.type === "min" && "is-invalid"} ${
              errors.rating?.type === "max" && "is-invalid"
            }`}
            {...register("rating", {
              required: "Rating is required",
              min: 1,
              max: 5,
              valueAsNumber: true,
            })}
          />
          {errors.rating?.type === "required" && (
            <small className="form-text text-danger">
              * Rating is required
            </small>
          )}
          {errors.rating?.type === "min" && (
            <small className="form-text text-danger">
              * Rating must be in range of 1-5
            </small>
          )}
          {errors.rating?.type === "max" && (
            <small className="form-text text-danger">
              * Rating must be in range of 1-5
            </small>
          )}
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-25 mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { formId: "Food" },
      },
      {
        params: { formId: "Movie" },
      },
    ],
    fallback: false,
  };
};
