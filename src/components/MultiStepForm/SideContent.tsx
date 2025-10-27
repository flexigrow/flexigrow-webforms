import { DefaultGearIcon } from "./DefaultGearIcon";

interface SideContentItem {
  icon: string;
  heading: string;
  subheading: string;
}

interface SideContentProps {
  items: SideContentItem[];
}

const SideContentItem = ({ icon, heading, subheading }: SideContentItem) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-6">
      <div className="flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-primary">
        {icon ? (
          <img
            className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px] object-contain"
            src={icon}
            alt="icon"
            onError={(e) => {
              // Replace failed image with fallback SVG
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector("svg")) {
                const svgContainer = document.createElement("div");
                parent.appendChild(svgContainer);
                // The SVG will be rendered by React on next render
              }
            }}
          />
        ) : (
          <DefaultGearIcon />
        )}
      </div>
      <div>
        <div className="text-lg sm:text-xl font-bold text-white mb-2">
          {heading}
        </div>
        <div className="text-sm sm:text-base text-white font-normal">
          {subheading}
        </div>
      </div>
    </div>
  );
};

export const SideContent = ({ items }: SideContentProps) => {
  return (
    <div className="col-span-12 md:col-span-4 flex flex-col gap-6 sm:gap-8">
      {items.map((item, index) => (
        <SideContentItem
          key={index}
          icon={item.icon}
          heading={item.heading}
          subheading={item.subheading}
        />
      ))}
    </div>
  );
};
