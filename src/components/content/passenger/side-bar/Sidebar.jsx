import React, { useCallback, useState } from "react";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import {
  cameraOptions,
  countOptions,
  pageOptions,
  solOptions,
} from "../../../../constant/general";
import Button from "../../../shared/buttons/Button";
import { getApodPhotos, getMarsRoverPhotos } from "../../../../api/nasaAPIs";
import { useDispatch } from "react-redux";
import {
  handleTabs,
  storeApodPhotos,
  storeMarsRoverPhotos,
} from "../../../../redux/features/nasaSlice";
import Input from "../../../shared/fields/Input";
import moment from "moment";
import Tabs from "../../../shared/tabs/Tabs";
import { useAppSelector } from "../../../../redux/store";

const tabs = [
  {
    label: "APOD",
    value: true,
  },
  {
    label: "Mars Rover Photos",
    value: false,
  },
];

const initialState = {
  sol: "none",
  camera: "all",
  earth_date: "",
  page: 1,
  date: "",
  start_date: "",
  end_date: "",
  count: "none",
};

const Sidebar = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isApodActive } = useAppSelector((state) => state.nasa);
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isApodActive) {
      const params = {
        date: form.date || undefined,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        count: form.count !== "none" ? form.count : undefined,
      };

      try {
        const response = await getApodPhotos(params);
        dispatch(
          storeApodPhotos(
            Array.isArray(response?.data) ? response?.data : [response?.data]
          )
        );
        setError("");
      } catch (error) {
        setError(error?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    } else {
      const params = {
        sol: form.sol !== "none" ? form.sol : undefined,
        camera: form.camera !== "all" ? form.camera : undefined,
        earth_date: form.earth_date || undefined,
        page: form.page || 1, // Default to page 1 if not provided
      };

      try {
        const response = await getMarsRoverPhotos(params);
        dispatch(storeMarsRoverPhotos(response?.data?.photos || []));
        setError("");
      } catch (error) {
        setError(error?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleActiveTabs = (value) => {
    dispatch(handleTabs(value));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm(initialState);
  };

  return (
    <div
      className="sticky top-14 flex-col w-[300px] bg-pp-primary-25 border-r border-pp-primary-100"
      style={MainSidebarWrapperStyle}
    >
      <Tabs
        tabs={tabs}
        activeTab={isApodActive}
        handleTabs={handleActiveTabs}
      />
      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col gap-5 p-5"
          style={InnerSidebarWrapperStyle}
        >
          {isApodActive ? (
            <p className="text-sm text-gray-500">
              Astronomy picture of the day.
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Image data gathered by NASA's Curiosity, Opportunity, and Spirit
              rovers on Mars
            </p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {isApodActive ? (
            <>
              <Input
                type="date"
                label="Date"
                name="date"
                value={form.date}
                max={moment().subtract(1, "year").format("YYYY-MM-DD")}
                handleChange={handleChange}
                isDisabled={form.start_date || form.end_date}
              />
              <Input
                type="date"
                label="Start date"
                name="start_date"
                value={form.start_date}
                max={moment().subtract(1, "year").format("YYYY-MM-DD")}
                handleChange={handleChange}
                isDisabled={form.date}
              />
              <Input
                type="date"
                label="End date"
                name="end_date"
                value={form.end_date}
                max={moment().subtract(1, "year").format("YYYY-MM-DD")}
                handleChange={handleChange}
                isDisabled={form.date}
              />

              <TypeOrSelect
                isClearable
                label="Count"
                name="count"
                onChange={handleChange}
                options={countOptions}
                value={form.count}
                isDisabled={form.date || form.start_date || form.end_date}
              />
            </>
          ) : (
            <>
              <TypeOrSelect
                isClearable
                label="Sol"
                name="sol"
                onChange={handleChange}
                options={solOptions}
                value={form.sol}
                isDisabled={form.earth_date}
              />
              <Input
                type="date"
                label="Earth date"
                name="earth_date"
                value={form.earth_date}
                max={moment().subtract(1, "year").format("YYYY-MM-DD")}
                handleChange={handleChange}
                isDisabled={form.sol !== "none"}
              />
              <TypeOrSelect
                isClearable
                label="Camera"
                name="camera"
                onChange={handleChange}
                options={cameraOptions}
                value={form.camera}
              />
              <TypeOrSelect
                isClearable
                label="Page"
                name="page"
                onChange={handleChange}
                options={pageOptions}
                value={form.page}
                showRequiredLabel
              />
            </>
          )}
        </div>

        <div className="fixed flex items-center gap-2 px-5 border-t border-pp-primary-100 bottom-0 h-20 w-[300px]">
          <Button variant="light" className="w-1/3" handleButton={handleReset}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-2/3"
            isLoading={loading}
          >
            Find
          </Button>
        </div>
      </form>
    </div>
  );
};

const MainSidebarWrapperStyle = {
  maxHeight: "calc(100vh - 56px)",
};

const InnerSidebarWrapperStyle = {
  height: "calc(100vh - 136px)",
  overflow: "auto",
};

export default Sidebar;
