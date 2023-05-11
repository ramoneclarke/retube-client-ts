import * as DropdownMenuRadix from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/utils";
import { forwardRef } from "react";

const DropdownMenuRoot = DropdownMenuRadix.Root;

const DropdownMenuTrigger = DropdownMenuRadix.Trigger;

const DropdownMenuPortal = DropdownMenuRadix.Portal;

const DropdownMenuContent = forwardRef(
  ({ className, sideOffset = 5, ...props }, ref) => (
    <DropdownMenuRadix.Content
      className={cn(
        "data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade dark:darker mr-4 min-w-[220px] rounded-md bg-lightest p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  )
);

const DropdownMenuItem = forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuRadix.Item
    className={cn(
      "grouprelative my-1 flex h-10 cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-base font-medium leading-none outline-none",
      className
    )}
    ref={ref}
    {...props}
  />
));

DropdownMenuItem.displayName = DropdownMenuRadix.Item.displayName;

const DropdownMenuSeparator = DropdownMenuRadix.Separator;

const DropdownMenuGroup = DropdownMenuRadix.Group;

DropdownMenuContent.displayName = DropdownMenuRadix.Content.displayName;

export {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
};
