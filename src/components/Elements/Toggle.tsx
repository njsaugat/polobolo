import { Switch } from "@headlessui/react";
type ToggleProps = {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  removePreviousSelected: () => void;
};
const Toggle = ({
  enabled,
  setEnabled,
  removePreviousSelected,
}: ToggleProps) => {
  return (
    <div onClick={removePreviousSelected} className="h-10 py-1">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled
            ? "bg-gradient-to-r from-teal-400 to-teal-500"
            : " bg-gradient-to-r from-slate-600 to-teal-800"
        }
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;
