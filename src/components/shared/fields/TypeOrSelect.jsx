import React, {
  forwardRef,
  useMemo,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import Select from "react-select";
import classnames from "classnames";

const TypeOrSelect = forwardRef(
  (
    {
      className,
      inputClass,
      label,
      name,
      value,
      placeholder,
      options,
      error,
      showRequiredLabel = false,
      onChange,
      isDisabled = false,
    },
    ref
  ) => {
    const [optionValue, setOptionValue] = useState(null);

    useEffect(() => {
      const selectedOption = options.find((el) => el.value === value);
      setOptionValue(
        selectedOption ? selectedOption : value ? { label: value, value } : null
      );
    }, [value, options]);

    // Memoize customStyles to prevent re-creation on every render
    const customStyles = useMemo(
      () => ({
        control: (styles, { isFocused }) => ({
          ...styles,
          boxShadow: isFocused
            ? "0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
            : "none",
          border: error ? "1px solid #e94848" : "1px solid #D0D5DD",
          borderRadius: 8,
          height: 40,
          width: "100%",
          cursor: "pointer",
          ":hover": {
            borderColor: "#D0D5DD",
          },
        }),
        menu: (styles) => ({
          ...styles,
          borderRadius: 7,
          zIndex: 10,
        }),
      }),
      [error]
    );

    // Memoize options list, including the current option if it's not in the default options
    const memoizedOptions = useMemo(() => {
      return optionValue &&
        !options.some((option) => option.value === optionValue.value)
        ? [...options, optionValue]
        : options;
    }, [options, optionValue]);

    // Use the ref to focus the select component
    useImperativeHandle(ref, () => ({
      focus: () => {
        // Select component exposes a focus method
        selectRef.current.focus();
      },
    }));

    // Create a ref for the Select component
    const selectRef = React.useRef();

    return (
      <div className={classnames("flex flex-col gap-1.5", className)}>
        {label && (
          <label className="text-sm font-medium leading-[20px] tracking-[0.28px] text-pp-gray-700">
            {label} {showRequiredLabel && "*"}
          </label>
        )}
        <div
          className={classnames(
            "flex outline-none w-full h-11 bg-white shadow-xs",
            inputClass
          )}
        >
          <Select
            ref={selectRef}
            onChange={(newValue) => {
              setOptionValue(newValue);
              onChange({
                target: {
                  name,
                  value: newValue?.value,
                },
              });
            }}
            options={memoizedOptions}
            value={optionValue}
            className="w-full"
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#F4EBFF",
                primary: "#D6BBFB",
              },
            })}
            placeholder={placeholder}
            isDisabled={isDisabled}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TypeOrSelect.displayName = "TypeOrSelect";

export default TypeOrSelect;
