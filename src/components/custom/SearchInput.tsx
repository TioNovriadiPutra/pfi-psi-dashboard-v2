import type { SuggestionType } from "@interfaces/formInterface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { type DebouncedFunc } from "lodash";
import { Reuleaux } from "ldrs/react";
import "ldrs/react/Reuleaux.css";

type Props = {
  suggestions?: SuggestionType[];
  isLoading?: boolean;
  onSearch?: DebouncedFunc<(value: any) => void>;
  onSelect?: (data: SuggestionType) => void;
};

const SearchInput = ({ suggestions, isLoading, onSearch, onSelect }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="relative flex-1 !flex-row items-center lg:w-[320px] px-[12px] py-[7px] bg-neutral-0 border border-neutral-200 rounded-md gap-[8px]">
      {isLoading ? (
        <Reuleaux
          size="15"
          stroke="3"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="1.2"
          color="#3399aa"
        />
      ) : (
        <BiSearch size={18} className="text-neutral-500" />
      )}

      <input
        {...register("search")}
        placeholder="Search here..."
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        onChange={(e) => {
          const value = e.target.value;

          register("search").onChange(e);

          if (onSearch) onSearch(value);
        }}
      />

      {suggestions && isFocused ? (
        <div
          className="absolute z-[999] left-0 right-0 top-[110%] bg-neutral-0 border border-neutral-200 rounded-md p-[5px] origin-top max-h-[300px] overflow-auto"
          style={{ boxShadow: "0px 2px 4px -2px rgba(0, 0, 0, 0.1)" }}
        >
          {suggestions.map((item, index) => (
            <button
              key={index.toString()}
              type="button"
              className="!flex-col !items-start px-xs py-[8px]  bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 rounded-md gap-[6px]"
              onClick={() => {
                if (onSelect) onSelect(item);
              }}
            >
              <p className="text-body-sm font-normal text-neutral-900">
                {item.label}
              </p>

              <p className="text-body-xs font-normal text-neutral-400 text-left">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
