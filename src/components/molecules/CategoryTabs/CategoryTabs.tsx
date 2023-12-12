import { Tab, TabGroupProps } from "@headlessui/react";
import { categories } from "./categories";
import { motion } from "framer-motion";

export type CategoryTabsProps = {
  onCategoryChanged: (category: Category) => void;
  activeCategory: Category;
} & Omit<TabGroupProps<"div">, "onChange">;

export const CategoryTabs = (props: CategoryTabsProps) => {
  const { onCategoryChanged, activeCategory = "all", ...rest } = props;
  return (
    <Tab.Group
      {...rest}
      selectedIndex={categories.indexOf(activeCategory)}
      onChange={(index) => {
        const category = categories[index];
        onCategoryChanged(category);
      }}
    >
      <Tab.List className="border-b border-black/12 inline-block">
        {categories.map((category) => (
          <Tab
            key={category}
            className={`md:button-text relative transition-colors w-20 md:w-24 mb-2 outline-none text-gray-900/60 hover:text-gray-900/87 
            capitalize ui-selected:text-blue-400 ui-focus-visible:outline-blue-400`}
          >
            {({ selected }) => (
              <>
                <span>{category}</span>
                {selected ? (
                  <motion.div
                    className="absolute -bottom-2.5 left-0 right-0 h-1 bg-blue-400"
                    layoutId="underline"
                  />
                ) : null}
              </>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};
