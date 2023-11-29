import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { languages, useLanguage } from "../../context/LanguageContext";

export default function AvailableLanguages() {
  const { language, setLanguage, changeLanguage } = useLanguage();
  console.log(language);
  return (
    <div className="text-xs">
      <Listbox
        value={language}
        onChange={(language) => {
          setLanguage(language);
          changeLanguage(language);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block text-xs truncate">
              {language.nativeName}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {languages.map((lng, languageIdx) => (
                <Listbox.Option
                  key={`${languageIdx}${lng}`}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-100 text-teal-900" : "text-gray-900"
                    }`
                  }
                  value={lng}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-xs ${
                          lng ? "font-medium" : "font-normal"
                        }`}
                        // onClick={() => changeLanguage(lng)}
                      >
                        {lng.nativeName}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
