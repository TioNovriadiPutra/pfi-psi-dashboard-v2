import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="!flex-row items-center w-[320px] px-[12px] py-[7px] bg-neutral-0 border border-neutral-200 rounded-md gap-[8px]">
      <BiSearch size={18} className="text-neutral-500" />

      <input {...register("search")} placeholder="Search here..." type="text" />
    </div>
  );
};

export default SearchInput;
