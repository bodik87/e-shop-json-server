import { createProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";

type Props = {};

export default function Create({}: Props) {
  return (
    <>
      <p className="mt-4 font-semibold text-lg">Create new product</p>
      <form className="mt-4 flex flex-col gap-2" action={createProduct}>
        <label>Title</label>
        <input
          name="title"
          type="text"
          className="w-fit border px-2 py-1.5"
          placeholder="Title"
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          className="w-fit border px-2 py-1.5"
          placeholder="Price"
        />

        <SubmitButton label="Save" />
      </form>
    </>
  );
}
