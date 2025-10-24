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
    <div className="flex flex-col items-start gap-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#CEFF00]">
        <img
          className="w-[40px] h-[40px] object-contain"
          src={icon}
          alt="icon"
        />
      </div>
      <div>
        <div className="text-xl font-bold text-white mb-2">{heading}</div>
        <div className="text-md text-white font-normal">{subheading}</div>
      </div>
    </div>
  );
};

export const SideContent = ({ items }: SideContentProps) => {
  return (
    <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
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
