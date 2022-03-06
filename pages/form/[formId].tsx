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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormPage: NextPage = ({
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const schema = Yup.object({
    name: Yup.string().required("* Name is required"),
    image: Yup.string()
      .required("* Image URL is required")
      .url("* Enter a valid URL")
      .test(
        "checkURL",
        "* Only Unsplash Images are available",
        (image = "") => {
          if (image.toLowerCase().includes("unsplash.com", 0)) {
            return true;
          } else {
            return false;
          }
        }
      ),
    description: Yup.string().required("* Description is required"),
    rating: Yup.number()
      .typeError("* Rating is required")
      .min(1, "* Rating must be in range of 1-5")
      .max(5, "* Rating must be in range of 1-5")
      .required("* Rating is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = (data: { [x: string]: object }) => {
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
    router.push(`/${params.formId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className="display-1 text-center mb-5">Form for {params.formId}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group form-container mb-3">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <input
            data-testid="input-name"
            className={`form-control ${errors.name?.message && "is-invalid"}`}
            {...register("name")}
          />
          <small className="form-text text-danger">
            {errors.name?.message}
          </small>
        </div>

        <div className="form-group form-container mb-3">
          <label htmlFor="image" className="mb-1">
            Image Url
          </label>
          <input
            data-testid="input-image"
            type="url"
            className={`form-control ${errors.image?.message && "is-invalid"}`}
            {...register("image")}
          />
          <small className="form-text text-danger">
            {errors.image?.message}
          </small>
        </div>

        <div className="form-group form-container mb-3">
          <label htmlFor="description" className="mb-1">
            Description
          </label>
          <input
            data-testid="input-description"
            className={`form-control ${
              errors.description?.message && "is-invalid"
            }`}
            {...register("description")}
          />
          <small className="form-text text-danger">
            {errors.description?.message}
          </small>
        </div>

        <div className="form-group form-container mb-3">
          <label htmlFor="rating" className="mb-1">
            Rating (1-5)
          </label>
          <input
            data-testid="input-rating"
            type="number"
            className={`form-control ${errors.rating?.message && "is-invalid"}`}
            {...register("rating")}
          />
          <small className="form-text text-danger">
            {errors.rating?.message}
          </small>
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
